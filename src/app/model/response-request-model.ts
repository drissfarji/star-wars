export interface ResponseRequestModel<T> {
	count: number;
	next: string;
	previous: string;
	results: T[];
}
