import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/of';

import { People } from '../model/people';
import { ResponseRequestModel } from '../model/response-request-model';
import { PlanetService } from './planet.service';
import { SwapiService } from './swapi.service';

@Injectable()
export class PeopleService extends SwapiService<People> {

	constructor(http: HttpClient, @Inject('URLS') sourceURL: string, private planetService: PlanetService) {
		super(http, sourceURL['people'], ['homeworld', 'films', 'vehicle', 'species', 'starship']);
	}

	transform(item: People): Observable<People> {
		return super.transform(item)
			.mergeMap(async (character) => {
				const planet = await this.planetService.getItemByUrlId(<UrlId>character.homeworld).toPromise();
				character.homeworld = planet;
				return character;
			});
	}
}
