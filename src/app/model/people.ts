import { HasUrlId } from './hasUrlId';
import { HasMetadata } from './HasMetaData';
import { Planet } from './planet';
import { Film } from './film';

export interface People extends HasUrlId, HasMetadata  {
	name: string;
	height: string;
	mass: number;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: string;
	homeworld: string | UrlId | Planet;
	films: string[] | UrlId[] | Film[];
	species: string[] | UrlId[];
	vehicles: string[] | UrlId[];
	starships: string[] | UrlId[];
}
