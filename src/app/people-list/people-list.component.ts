import { Component, OnInit, Input } from '@angular/core';

import { MatTableDataSource } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';
import { People } from '../model/people';

import { PeopleService } from '../services/people.service';

@Component({
	selector: 'app-people-list',
	templateUrl: './people-list.component.html',
	styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

	dataSource = new MatTableDataSource<People>([]);

	isLoadingResults = true;

	isRateLimitReached = false;

	displayedColumns = ['url', 'name', 'gender', 'birth_year', 'homeworld', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color'];

	stream: Observable<People>;

	constructor(private service: PeopleService) { }

	/**
	 * to be used embeded in other template like the planet-detail template
	 * @param peoplesUrlId the tab of UrlId to be displayed
	 */
	@Input() set setData(peoplesUrlId: UrlId[]) {
		this.stream = Observable.merge(...peoplesUrlId.map(
			urlId => this.service.getItemByUrlId(urlId)
		));
	}

	/**
	 * fill the table, from list of People or from another Object e.g Planet
	 */
	ngOnInit() {
		if (this.stream == null) {
			this.stream = this.service.getData();
		}
		this.fillTable();
	}

	fillTable() {
		this.stream.subscribe(async (people) => {
			this.dataSource.data.push(people);
		}, error => { console.log(error); }, () => {
			const characters = this.dataSource.data;
			// horrible hack to cause table refresh
			this.dataSource.data = [];
			this.dataSource.data = characters;
			this.isLoadingResults = false;
		});
	}
}
