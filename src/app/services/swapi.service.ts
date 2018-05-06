import { HasUrlId } from '../model/hasUrlId';
import { HasMetadata } from '../model/HasMetaData';

export class SwapiService<T extends HasUrlId & HasMetadata> {

	toUrlId(url: string): UrlId {
		const parts = url.split('/');
		return {
			url,
			class: parts[parts.length - 3],
			id: +parts[parts.length - 2]
		};
	}

}
