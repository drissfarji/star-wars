import { Component, OnInit } from '@angular/core';
import { Planet } from '../model/planet';
import { MatTableDataSource } from '@angular/material';
import { PlanetService } from '../services/planet.service';

@Component({
	selector: 'app-planet-list',
	templateUrl: './planet-list.component.html',
	styleUrls: ['./planet-list.component.css']
})
export class PlanetListComponent implements OnInit {

	dataSource = new MatTableDataSource<Planet>([]);

	isLoadingResults = true;

	isRateLimitReached = false;

	displayedColumns = [
		'url',
		'name',
		'rotation_period',
		'orbital_period',
		'diameter',
		'climate',
		'gravity',
		'terrain',
		'surface_water',
		'population'
	];

	constructor(private planetService: PlanetService) { }

	ngOnInit() {
		this.planetService.getData()
		.subscribe(planet => {
			this.dataSource.data.push(planet);
		}, error => { console.log(error); }, () => {
			const planets = this.dataSource.data;
			// horrible hack to cause table refresh
			this.dataSource.data = [];
			this.dataSource.data = planets;
			this.isLoadingResults = false;
		});
	}

}
