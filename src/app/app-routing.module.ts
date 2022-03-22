import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
