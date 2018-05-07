import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { SwapiService } from './swapi.service';

import { Film } from '../model/film';

@Injectable()
export class FilmService extends SwapiService<Film> {

	constructor(http: HttpClient, @Inject('URLS') sourceURL: string) {
		super(http, sourceURL['films'], ['characters', 'films', 'vehicles', 'species', 'starship']);
	}

}
