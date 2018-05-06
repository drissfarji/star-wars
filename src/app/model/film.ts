import { People } from './people';
import { Planet } from './planet';

export interface Film {
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	characters: People[];
	planets: Planet[];
	starships: any[];
	vehicles: any[];
	species: any[];
	created: string;
	edited: string;
	url: string;
}
