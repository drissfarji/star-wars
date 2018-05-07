import { People } from './people';
import { Planet } from './planet';
import { HasMetadata } from './HasMetaData';
import { HasUrlId } from './hasUrlId';

export interface Film extends HasMetadata, HasUrlId {
	title: string;
	episode_id: number;
	opening_crawl: string;
	director: string;
	producer: string;
	release_date: string;
	characters: People[];
	planets: string[] | UrlId[] | Planet[];
	starships: string[] | UrlId[];
	vehicles: string[] | UrlId[];
	species: string[] | UrlId[];
}
