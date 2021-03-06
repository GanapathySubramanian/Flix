import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesComponent } from './components/movies/movies.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonsComponent } from './components/persons/persons.component';
import { TvshowDetailsComponent } from './components/tvshow-details/tvshow-details.component';
import { TvshowEpisodesComponent } from './components/tvshow-episodes/tvshow-episodes.component';
import { TvshowsComponent } from './components/tvshows/tvshows.component';

const routes: Routes = [
  {
    path:'',component:MoviesComponent
  },
  {
    path:'tvshows',component:TvshowsComponent
  },
  {
    path:'peoples',component:PersonsComponent
  },
  {
    path:'moviedetails/:id',component:MovieDetailsComponent
  },
  {
    path:'similarmoviesdetails/:id',component:MovieDetailsComponent
  },
  {
    path:'tvshowdetails/:id',component:TvshowDetailsComponent
  },
  {
    path:'similartvshowdetails/:id',component:TvshowDetailsComponent
  },
  {
    path:'persondetails/:id',component:PersonDetailsComponent
  },
  {
    path:'tvshow-episode/:tvshowid/:season/:tvshow_name',component:TvshowEpisodesComponent
  },
  {
    path:'**',
    component:MoviesComponent,
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
