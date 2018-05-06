import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people.component';

const ROUTES: Routes = [
	{ path: 'planets', component: PeopleComponent },
	{ path: 'people', component: PeopleComponent }
];

export const routing = RouterModule.forRoot(ROUTES);
