import { Component, OnInit } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';

import { MatTableDataSource } from '@angular/material';

import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';

import { Observable } from 'rxjs/Observable';

import { People } from '../model/people';

import { PeopleService } from '../services/people.service';
import { PlanetService } from '../services/planet.service';

@Component({
	selector: 'app-people',
	templateUrl: './people.component.html',
	styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

	// data: People[];
	dataSource = new MatTableDataSource<People>([]);

	displayedColumns = ['url', 'name', 'homeworld'];

	constructor(private service: PeopleService, private planetService: PlanetService) { }

	ngOnInit() {
		this.service.getPeople().subscribe(async (people) => {
			this.dataSource.data.push(people);
		}, error => { console.log(error); }, () => {
			const characters = this.dataSource.data;
			// horrible hack to cause table refresh
			this.dataSource.data = [];
			this.dataSource.data = characters;
		});
	}

	redirectToPlanetDetail(id: string) {
		console.log('redirectTo ' + id);
	}
}
