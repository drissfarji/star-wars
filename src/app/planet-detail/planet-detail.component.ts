import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlanetService } from '../services/planet.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Planet } from '../model/planet';

@Component({
	selector: 'app-planet-detail',
	templateUrl: './planet-detail.component.html',
	styleUrls: ['./planet-detail.component.css']
})
export class PlanetDetailComponent implements OnInit, OnDestroy {

	private sub: Subscription;
	private planet: Planet;

	constructor(private planetService: PlanetService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.sub = this.route.params
			.subscribe(params => this.planetService.getItemById(params['id'])
				.subscribe(
					planet => this.planet = planet,
					error => { },
					() => { },
			)
			);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
