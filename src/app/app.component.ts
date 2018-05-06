import { Component, ElementRef } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	count = 0;
	constructor(private element: ElementRef) { }

	countLike() {
		this.count += 1;
	}

	share() {
		/*
		const html: HTMLElement = this.element.nativeElement;
		const img = html.getElementsByTagName('img');
		console.log(img.item(0).getAttribute('src'));
		*/
	}
}
