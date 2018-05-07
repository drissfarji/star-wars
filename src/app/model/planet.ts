import { People } from './people';
import { HasUrlId } from './hasUrlId';
import { HasMetadata } from './HasMetaData';
import { Film } from './film';

export interface Planet extends HasUrlId, HasMetadata {
	name: string;
	rotation_period: number;
	orbital_period: number;
	diameter: number;
	climate: string;
	gravity: string;
	terrain: string;
	surface_water: number;
	population: number;
	residents: string[] | UrlId[] | People[];
	films: string[] | UrlId[] | Film[];
}
