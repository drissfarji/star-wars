// angular imports
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';

// angular Material design imports
import { MatCardModule, MatButtonModule, MatTableModule, MatProgressSpinnerModule } from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';

import * as swapi from './services/conf.api.urls';
// routes import
import { routing } from './app.routes';

// services imports
import { PeopleService } from './services/people.service';
import { PlanetService } from './services/planet.service';

// components imports
import { AppComponent } from './app.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';

@NgModule({
	exports: [],
	declarations: [
		AppComponent,
		PeopleListComponent,
		PlanetDetailComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		RouterModule,
		MatCardModule,
		MatButtonModule,
		MatTableModule,
		MatTabsModule,
		MatProgressSpinnerModule,
		MatExpansionModule,
		routing
	],
	providers: [PeopleService, PlanetService,
	{provide: 'URLS', useValue: swapi.default}],
	bootstrap: [AppComponent]
})
export class AppModule { }
