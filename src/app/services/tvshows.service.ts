import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TvshowsService {

  genre:Observable<any[]> = of([{id:10759,name:'Action & Adventures'},{id:16,name:'Animation'},{id:35,name:'Comedy'},{id:80,name:'Crime'},{id:99,name:'Documentary'},{id:18,name:'Drama'},{id:10751,name:'Family'},{id:10762,name:'Kids'},{id:9648,name:'Mystery'},{id:10763,name:'News'},{id:10764,name:'Reality'},{id:10765,name:'Science-Fiction & Fantacy'},{id:10766,name:'Soap'},{id:10767,name:'Talk'},{id:10768,name:'War & Politics'},{id:37,name:'Western'}]);  
  sortBy:Observable<any[]> = of([{  order:'popularity.desc',  desc:'Tvshows Trending Now'},{  order:'popularity.asc',  desc:'Old Trend Tvshows'},{  order:'vote_average.desc',  desc:'Top Rated Tvshows'},{  order:'vote_average.asc',  desc:'Low Rated Tvshows'},{  order:'first_air_date.desc',  desc:'Tvshows - Release Date Descending'},{  order:'first_air_date.asc',  desc:'Tvshows - Release Date Ascending'}]);
  
  
  private tvshowSource = new Subject();
  tvshowsData = this.tvshowSource.asObservable();

  constructor(private http:HttpClient) { }

  getGenreList():Observable<any[]>{
    return this.genre;
  }

  getOrderList():Observable<any[]>{
    return this.sortBy;
  }

  getallTvshows(url:any){
    let  tvshow:any;
    this.http.get(url).subscribe((res)=>{
      tvshow=res;
      this.tvshowSource.next(tvshow)
    })
  }
}
