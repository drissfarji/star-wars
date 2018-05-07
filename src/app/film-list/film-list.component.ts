import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/merge';

import { Film } from '../model/film';
import { FilmService } from '../services/film.service';

@Component({
	selector: 'app-film-list',
	templateUrl: './film-list.component.html',
	styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

	dataSource = new MatTableDataSource<Film>([]);

	isLoadingResults = true;

	isRateLimitReached = false;

	displayedColumns = ['episode_id', 'title', 'director', 'producer', 'release_date'];

	stream: Observable<Film>;


	constructor(private filmService: FilmService) { }

	/**
	 * to be used embeded in other template like the planet-detail template
	 * @param filmsUrlId

 the tab of UrlId to be displayed
	 */
	@Input() set setData(filmsUrlId: UrlId[]) {
		this.stream = Observable.merge(...filmsUrlId.map(
			urlId => this.filmService.getItemByUrlId(urlId)
		));
	}

	/**
	 * fill the table, from list of People or from another Object e.g Planet
	 */
	ngOnInit() {
		if (this.stream == null) {
			this.stream = this.filmService.getData();
		}
		this.fillTable();
	}

	fillTable() {
		this.stream.subscribe(async (film) => {
			this.dataSource.data.push(film);
		}, error => { console.log(error); }, () => {
			const films = this.dataSource.data;
			// horrible hack to cause table refresh
			this.dataSource.data = [];
			this.dataSource.data = films;
			this.isLoadingResults = false;
		});
	}

}
