import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  genre:Observable<any[]> = of([{id:28,name:'Action'},{id:12,name:'Adventures'},{id:16,name:'Animation'},{id:35,name:'Comedy'},{id:80,name:'Crime'},{id:99,name:'Documentary'},{id:18,name:'Drama'},{id:10751,name:'Family'},{id:14,name:'Fantacy'},{id:36,name:'History'},{id:27,name:'Horror'},{id:10402,name:'Music'},{id:9648,name:'Mystery'},{id:10749,name:'Romance'},{id:878,name:'Science Fiction'},{id:10770,name:'Tv'},{id:53,name:'Thriller'},{id:10752,name:'War'},{id:37,name:'Western'},]);  
  sortBy:Observable<any[]> = of([{order:'upcoming.desc',desc:'Upcoming'},{order:'nowplaying.desc',desc:'Now Playing'},{  order:'popularity.desc',  desc:'Trending Now'},{  order:'popularity.asc',  desc:'Old Low trend'},{  order:'vote_average.desc',  desc:'Top Rated'},{  order:'vote_average.asc',  desc:'Low Rated'},{  order:'release_date.desc',  desc:'Release Date Des'},{  order:'release_date.asc',  desc:'Release Date Asc'},{  order:'original_title.desc',  desc:'Z To A'},{  order:'original_title.asc',  desc:'A To Z'},{  order:'revenue.desc',  desc:'Top Grossing'},{  order:'revenue.asc',  desc:'Low Grossing'}])
  
  //Movies List
  private movieSource = new Subject();
  moviesData = this.movieSource.asObservable();

  //Search Movies List
  private searchmovieSource = new Subject();
  searchmoviesData = this.searchmovieSource.asObservable();
  
  //Upcoming Movies List
  private upcomingSource=new Subject();
  upcomingData=this.upcomingSource.asObservable();
  
  //Particular Movie details
  private moviedetailSource=new Subject();
  moviedetailsData=this.moviedetailSource.asObservable();

  //backdrop image
  private movieallImagesSource=new Subject();
  movieallImageData=this.movieallImagesSource.asObservable();

  //movie review
  private moviereviewSource=new Subject();
  moviereviewData=this.moviereviewSource.asObservable();

  //movie credit
  private moviecreditSource=new Subject();
  moviecreditData=this.moviecreditSource.asObservable();

  //similar movie
  private similarmovieSource=new Subject();
  similarmovieData=this.similarmovieSource.asObservable();

  //Recommended movie
  private recmovieSource=new Subject();
  recmovieData=this.recmovieSource.asObservable();
  
  //Videos
  private videoSource=new Subject();
  videoData=this.videoSource.asObservable();

  //Watch providers
  private watchSource=new Subject();
  watchData=this.watchSource.asObservable();

  
  constructor(private http:HttpClient) {}

  
  getGenreList():Observable<any[]>{
    return this.genre;
  }

  getOrderList():Observable<any[]>{
    return this.sortBy;
  }

  getSearchMovies(url:any){
    let searchmovies:any;
    this.http.get(url).subscribe((res)=>{
      searchmovies=res; 
      this.searchmovieSource.next(searchmovies);
    })
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

  getMovieDetails(url:any){
    let moviedetails:any;
    this.http.get(url).subscribe((res)=>{
      moviedetails=res;
      this.moviedetailSource.next(moviedetails);
    })
  }

  getAllImages(url:any){
    let movieimage:any;
    this.http.get(url).subscribe((res)=>{
      movieimage=res;
      this.movieallImagesSource.next(movieimage);
    })
  }


  getMovieReviews(url:any){
    let moviereview:any;
    this.http.get(url).subscribe((res)=>{
      moviereview=res;
      this.moviereviewSource.next(moviereview);
    })
  }

  getMovieCredits(url:any){
    let moviecredit:any;
    this.http.get(url).subscribe((res)=>{
      moviecredit=res;
      this.moviecreditSource.next(moviecredit);
    })
  }

  getSimilarMovies(url:any){
    let similarmovie:any;
    this.http.get(url).subscribe((res)=>{
      similarmovie=res;
      this.similarmovieSource.next(similarmovie);
    })
  }

  getRecommendedMovies(url:any){
    let recmovie:any;
    this.http.get(url).subscribe((res)=>{
        recmovie=res;
        this.recmovieSource.next(recmovie);
    })
  }

  getVideos(url:any){
    let videos:any;
    this.http.get(url).subscribe((res)=>{
      videos=res;
      this.videoSource.next(videos);
      
    })
  }

  getWatchProviders(url:any){
    let watchprovider:any;
    this.http.get(url).subscribe((res)=>{
      watchprovider=res;
      this.watchSource.next(watchprovider);
    })
  }

}
