import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionDetailsComponent } from './components/collection-details/collection-details.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesComponent } from './components/movies/movies.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonsComponent } from './components/persons/persons.component';
import { TvshowDetailsComponent } from './components/tvshow-details/tvshow-details.component';
import { TvshowEpisodesComponent } from './components/tvshow-episode/tvshow-episodes.component';
import { TvshowSeasonsComponent } from './components/tvshow-seasons/tvshow-seasons.component';
import { TvshowsComponent } from './components/tvshows/tvshows.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'tvshows',
    component: TvshowsComponent,
  },
  {
    path: 'collections',
    component: CollectionsComponent,
  },
  {
    path: 'peoples',
    component: PersonsComponent,
  },
  {
    path: 'mylist',
    component: WatchListComponent,
  },
  {
    path: 'moviedetails/:id',
    component: MovieDetailsComponent,
  },
  {
    path: 'similarmoviesdetails/:id',
    component: MovieDetailsComponent,
  },
  {
    path: 'tvshowdetails/:id',
    component: TvshowDetailsComponent,
  },
  {
    path: 'similartvshowdetails/:id',
    component: TvshowDetailsComponent,
  },
  {
    path: 'collectiondetails/:id',
    component: CollectionDetailsComponent,
  },
  {
    path: 'persondetails/:id',
    component: PersonDetailsComponent,
  },
  {
    path: 'tvshow-episode/:tvshowid/:season/:episode/:tvshow_name',
    component: TvshowEpisodesComponent,
  },
  {
    path: 'tvshow-season/:tvshowid/:season/:tvshow_name',
    component: TvshowSeasonsComponent,
  },
  {
    path: '**',
    component: HomeComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
