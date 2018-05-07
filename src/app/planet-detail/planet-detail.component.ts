import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { PlanetService } from '../services/planet.service';
import { Planet } from '../model/planet';

@Component({
	selector: 'app-planet-detail',
	templateUrl: './planet-detail.component.html',
	styleUrls: ['./planet-detail.component.css']
})
export class PlanetDetailComponent implements OnInit, OnDestroy {

	private sub: Subscription;
	@Input() planet: Planet;

	constructor(private planetService: PlanetService, private route: ActivatedRoute) { }

	ngOnInit() {
		if (this.planet == null) {
			this.sub = this.route.params
			.subscribe(params => this.planetService.getItemById(params['id'])
				.subscribe(
					planet => this.planet = planet,
					error => { },
					() => { },
			)
			);
		}
	}

	ngOnDestroy() {
		if (this.sub != null) {
			this.sub.unsubscribe();
		}
	}

}
