import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';
import { PeopleDetailComponent } from './people-detail/people-detail.component';

const ROUTES: Routes = [
	{ path: 'planets', component: PeopleListComponent },
	{ path: 'people', component: PeopleListComponent },
	{ path: 'planets/view/:id', component: PlanetDetailComponent },
	{ path: 'people/view/:id', component: PeopleDetailComponent }
];

export const routing = RouterModule.forRoot(ROUTES);
