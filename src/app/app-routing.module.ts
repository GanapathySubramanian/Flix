import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesComponent } from './components/movies/movies.component';
import { TvshowsComponent } from './components/tvshows/tvshows.component';
import { UpcomingMoviesComponent } from './components/upcoming-movies/upcoming-movies.component';

const routes: Routes = [
  {
    path:'',component:MoviesComponent
  },
  {
    path:'tvshows',component:TvshowsComponent
  },
  {
    path:'upcoming',component:UpcomingMoviesComponent
  },
  {
    path:'moviedetails/:id',component:MovieDetailsComponent
  },
  {
    path:'similarmoviesdetails/:id',component:MovieDetailsComponent
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
