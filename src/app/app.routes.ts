import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';
import { PeopleDetailComponent } from './people-detail/people-detail.component';
import { FilmListComponent } from './film-list/film-list.component';
import { PlanetListComponent } from './planet-list/planet-list.component';

const ROUTES: Routes = [
	{ path: 'planets', component: PlanetListComponent },
	{ path: 'people', component: PeopleListComponent },
	{ path: 'films', component: FilmListComponent },
	{ path: 'planets/view/:id', component: PlanetDetailComponent },
	{ path: 'people/view/:id', component: PeopleDetailComponent }
];

export const routing = RouterModule.forRoot(ROUTES);
