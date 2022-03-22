import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  genre:Observable<any[]> = of([{id:28,name:'Action'},{id:12,name:'Adventures'},{id:16,name:'Animation'},{id:35,name:'Comedy'},{id:80,name:'Crime'},{id:99,name:'Documentary'},{id:18,name:'Drama'},{id:10751,name:'Family'},{id:14,name:'Fantacy'},{id:36,name:'History'},{id:27,name:'Horror'},{id:10402,name:'Music'},{id:9648,name:'Mystery'},{id:10749,name:'Romance'},{id:878,name:'Science Fiction'},{id:10770,name:'Tv'},{id:53,name:'Thriller'},{id:10752,name:'War'},{id:37,name:'Western'},]);  
  sortBy:Observable<any[]> = of([{  order:'popularity.desc',  desc:'Movies Trending Now'},{  order:'popularity.asc',  desc:'Old Trend Movies'},{  order:'vote_average.desc',  desc:'Top Rated Movies'},{  order:'vote_average.asc',  desc:'Low Rated Movies'},{  order:'release_date.desc',  desc:'Movies - Release Date Descending'},{  order:'release_date.asc',  desc:'Movies - Release Date Ascending'},{  order:'original_title.desc',  desc:'Z To A Movies'},{  order:'original_title.asc',  desc:'A To Z Movies'},{  order:'revenue.desc',  desc:'Top Grossing Movies'},{  order:'revenue.asc',  desc:'Low Grossing Movies'}])
  
  private movieSource = new Subject();
  moviesData = this.movieSource.asObservable();

  private upcomingSource=new Subject();
  upcomingData=this.upcomingSource.asObservable();

  constructor(private http:HttpClient) {}
  
  getGenreList():Observable<any[]>{
    return this.genre;
  }

  getOrderList():Observable<any[]>{
    return this.sortBy;
  }

  getallMovies(url:any){
    let movies:any;
    this.http.get(url).subscribe((res)=>{
      movies=res;
      this.movieSource.next(movies)
    })
  }

  getUpcomingMovies(url:any){
    let upcomings:any;
    this.http.get(url).subscribe((res)=>{
      upcomings=res;
      this.upcomingSource.next(upcomings)
    })
  }

}
