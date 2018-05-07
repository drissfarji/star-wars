import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { People } from '../model/people';
import { PeopleService } from '../services/people.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-people-detail',
	templateUrl: './people-detail.component.html',
	styleUrls: ['./people-detail.component.css']
})
export class PeopleDetailComponent implements OnInit, OnDestroy {

	private sub: Subscription;
	private person: People;

	constructor(private peopleService: PeopleService, private route: ActivatedRoute) { }

	ngOnInit() {
		this.sub = this.route.params.subscribe(params =>
			this.peopleService.getItemById(params['id'])
				.subscribe(
					person => this.person = person,
					error => { },
					() => { },
			)
		);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

}
