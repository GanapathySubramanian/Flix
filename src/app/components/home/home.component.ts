import { Component, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';
import { MoviesService } from 'src/app/core/services/movies.service';
import { TvshowsService } from 'src/app/core/services/tvshows.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topMoviesList:any[]=[];
  trendingMoviesList:any[]=[];
  trendingTvList:any[]=[];

  highqualityImgUrl:string=myAppConfig.tmdb.highQualityImgUrl;

  constructor(private movieService:MoviesService,private tvshowService:TvshowsService) { }

  ngOnInit(): void {
    this.getMovies()
    this.getTvShows()
  }

  getMovies(){
      let api_url=myAppConfig.tmdb.movieBaseUrl+'/discover/movie?sort_by=popularity.desc'+'&'+myAppConfig.tmdb.apikey+'&page=1';
      this.getMoviesData(api_url)
  }
  getTvShows(){
  let api_url=myAppConfig.tmdb.tvshowBaseUrl+myAppConfig.tmdb.apikey+'&sort_by=popularity.desc'+'&page=1';
  this.getTvshowsData(api_url)
}

  getMoviesData(url:any) { 
    this.movieService.getallMovies(url);
    let tempMoviesList:any;
    this.movieService.moviesData.subscribe((data:any)=>{
       tempMoviesList=data.results;
       this.trendingMoviesList=tempMoviesList;       
       this.trendingMoviesList.forEach((movies,index) => {
        movies.background_image=this.highqualityImgUrl+movies.backdrop_path;
        movies.no_animation=true;
        if(index<5){
          this.topMoviesList.push(movies);
        }
       });
    });  
  }

  getTvshowsData(api_url: string) {
    this.tvshowService.getallTvshows(api_url);
    let tempTvshowList:any;
    this.tvshowService.tvshowsData.subscribe((data:any)=>{
      tempTvshowList=data.results;
      this.trendingTvList=tempTvshowList
  })
  }
}
