import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { ResponseRequestModel } from '../model/response-request-model';
import { Planet } from '../model/planet';

@Injectable()
export class PlanetService {

	url = 'https://swapi.co/api';

	constructor(private http: HttpClient) { }

	getPlanets(): Observable<ResponseRequestModel<Planet>> {
		return this.http.get<ResponseRequestModel<Planet>>(this.url + '/planets/');
	}

	getPlanet(url: UrlId): Observable<Planet> {
		return this.http.get<Planet>(url.url);
	}

}
