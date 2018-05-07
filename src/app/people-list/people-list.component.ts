import { Component, OnInit } from '@angular/core';

import { MatTableDataSource, MatSpinner } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import { People } from '../model/people';

import { PeopleService } from '../services/people.service';

@Component({
	selector: 'app-people',
	templateUrl: './people-list.component.html',
	styleUrls: ['./people-list.component.css']
})
export class PeopleComponent implements OnInit {

	dataSource = new MatTableDataSource<People>([]);
	isLoadingResults = true;
	isRateLimitReached = false;

	displayedColumns = ['url', 'name', 'homeworld'];

	constructor(private service: PeopleService) { }

	ngOnInit() {
		this.service.getPeople().subscribe(async (people) => {
			this.dataSource.data.push(people);
		}, error => { console.log(error); }, () => {
			const characters = this.dataSource.data;
			// horrible hack to cause table refresh
			this.dataSource.data = [];
			this.dataSource.data = characters;
			this.isLoadingResults = false;
		});
	}

	redirectToPlanetDetail(id: string) {
		console.log('redirectTo ' + id);
	}
}
