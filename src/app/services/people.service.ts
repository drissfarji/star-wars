import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { People } from '../model/people';
import { ResponseRequestModel } from '../model/response-request-model';
import { PlanetService } from './planet.service';

@Injectable()
export class PeopleService {

	url = 'https://swapi.co/api';
	fields: string[];
	constructor(private http: HttpClient, private planetService: PlanetService) {
		this.fields = ['homeworld', 'films', 'vehicle', 'species', 'starship', 'url'];
	}

	getPeoples(): Observable<ResponseRequestModel<People>> {
		return this.http.get<ResponseRequestModel<People>>(this.url + '/people/');
	}
	getPeople(): Observable<People> {
		return this.getPeoples().concatMap(json => Observable.of(...json.results))
			.mergeMap(item => this.transform(item))
			.mergeMap(item => Observable.of(item).mergeMap(async (character) => { // async() returns a Promise<Character>
				// e.g. "https://swapi.co/api/planets/1/"
				const planet = await this.planetService.getPlanet(<UrlId>character.homeworld).toPromise();
				character.homeworld = planet; // e.g. "Tatooine"
				return character;
			}));
	}

	transform(object: People): Observable<People> {
		object.created = new Date(<string>object.created);
		object.edited = new Date(<string>object.edited);
		this.fields.forEach(field => {
			if (object[field]) {
				if (object[field] instanceof Array) {
					// e.g. planets.residents
					object[field] = (<string[]>object[field])
						.map(f => this.toUrlId(f));
				} else {
					// e.g. character.homeworld
					object[field] = this.toUrlId(<string>object[field]);
				}
			} else {
				object[field] = [];
			}
		});
		return Observable.of(object);
	}

	toUrlId(url: string): UrlId {
		const parts = url.split('/');
		return {
			url,
			class: parts[parts.length - 3],
			id: +parts[parts.length - 2]
		};
	}



}
