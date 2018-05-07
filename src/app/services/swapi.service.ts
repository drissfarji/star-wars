import { HasUrlId } from '../model/hasUrlId';
import { HasMetadata } from '../model/HasMetaData';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { PlanetService } from './planet.service';
import { HttpClient } from '@angular/common/http';
import { ResponseRequestModel } from '../model/response-request-model';

export class SwapiService<T extends HasUrlId & HasMetadata> {

	public constructor(private http: HttpClient, private sourceUrl: string, private fields: string[] = []) {
		this.fields.push('url');
		console.log('init service for ' + sourceUrl);
	}

	public getItemByUrlId(url: UrlId): Observable<T> {
		return this.getItemById(url.id);
	}

	public getItemById(id: number): Observable<T> {
		return this.http.get<T>(`${this.sourceUrl}${id}/`)
			.mergeMap(item => this.transform(item));
	}

	public getData(): Observable<ResponseRequestModel<T>> {
		return this.http.get<ResponseRequestModel<T>>(this.sourceUrl);
	}

	protected transform(object: T): Observable<T> {
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

	protected toUrlId(url: string): UrlId {
		const parts = url.split('/');
		return {
			url,
			class: parts[parts.length - 3],
			id: +parts[parts.length - 2]
		};
	}
}
