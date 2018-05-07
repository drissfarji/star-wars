import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { ResponseRequestModel } from '../model/response-request-model';
import { Planet } from '../model/planet';
import { SwapiService } from './swapi.service';

@Injectable()
export class PlanetService extends SwapiService<Planet> {

	constructor(http: HttpClient, @Inject('URLS') sourceURL: string) {
		super(http, sourceURL['planets'], ['residents', 'films']);
	}

}
