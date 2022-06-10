import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MoviesComponent } from './components/movies/movies.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { TvshowsComponent } from './components/tvshows/tvshows.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { TvshowDetailsComponent } from './components/tvshow-details/tvshow-details.component';
import { TvshowEpisodesComponent } from './components/tvshow-episodes/tvshow-episodes.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonsComponent } from './components/persons/persons.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MoviesComponent,
    TvshowsComponent,
    MovieDetailsComponent,
    TvshowDetailsComponent,
    TvshowEpisodesComponent,
    PersonDetailsComponent,
    PersonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    IvyCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
