import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import myAppConfig from '../config/my-app-config';
import { MoviesService } from './movies.service';

type posters={
  moviePoster:string[],
  tvshowPoster:string[]
  movieBackdrop:string[],
  tvshowBackdrop:string[]
}

@Injectable({
  providedIn: 'root'
})
export class LandingService {

//Posters
 private posterSource=new BehaviorSubject<posters>({} as posters)
 posterData=this.posterSource.asObservable();

  moviePosters:string[]=[];
  tvshowPosters:string[]=[];
  movieBackdrops:string[]=[];
  tvshowBackdrops:string[]=[];
  movie_page:number=1;tvshow_page:number=1;
  constructor(private movieService:MoviesService,private http:HttpClient) {
    this.movie_page=this.movie_page+1;
    this.movie_page=this.tvshow_page+1;
   }

  getTopMoviesPosters(){
      let apiurl=myAppConfig.tmdb.movieBaseUrl+'/discover/movie?sort_by=popularity.desc'+'&'+myAppConfig.tmdb.apikey+'&page='+Math.random()*10;
      this.moviePosters=[];
      this.movieBackdrops=[];
      this.http.get(apiurl).subscribe((res:any)=>{
          res.results.forEach((element:any) => {
            this.moviePosters.push(element.poster_path)
            this.movieBackdrops.push(element.backdrop_path)
          });
        this.addData()
      })
  }
  getTopTvshowPosters(){
    let apiurl=myAppConfig.tmdb.tvshowBaseUrl+myAppConfig.tmdb.apikey+'&sort_by=popularity.desc'+'&page='+Math.random()*10;
    this.tvshowPosters=[];
    this.tvshowBackdrops=[];
    this.http.get(apiurl).subscribe((res:any)=>{
        res.results.forEach((element:any) => {
          this.tvshowPosters.push(element.poster_path)
          this.tvshowBackdrops.push(element.backdrop_path)
        });
        this.addData()
    })
  }

  addData(){
    let data:posters={
      moviePoster:this.moviePosters,
      tvshowPoster:this.tvshowPosters,
      movieBackdrop:this.movieBackdrops,
      tvshowBackdrop:this.tvshowBackdrops
    }
    
    this.posterSource.next(data);
  }
}
