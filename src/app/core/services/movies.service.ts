import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
import myAppConfig from '../config/my-app-config';
import { URL_CONSTANTS } from '../constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  genre: Observable<any[]> = of([
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventures' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantacy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'Tv' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
  ]);
  sortBy: Observable<any[]> = of([
    { order: 'upcoming.desc', desc: 'Upcoming' },
    { order: 'nowplaying.desc', desc: 'Now Playing' },
    { order: 'popularity.desc', desc: 'Trending Now' },
    { order: 'popularity.asc', desc: 'Old Low trend' },
    { order: 'vote_average.desc', desc: 'Top Rated' },
    { order: 'vote_average.asc', desc: 'Low Rated' },
    { order: 'release_date.desc', desc: 'Release Date Des' },
    { order: 'release_date.asc', desc: 'Release Date Asc' },
    { order: 'original_title.desc', desc: 'Z To A' },
    { order: 'original_title.asc', desc: 'A To Z' },
    { order: 'revenue.desc', desc: 'Top Grossing' },
    { order: 'revenue.asc', desc: 'Low Grossing' },
  ]);

  constructor(private http: HttpClient) {}

  getCountry(): Observable<any> {
    var country_url =
      myAppConfig.tmdb.baseUrl +
      '/configuration/countries?' +
      myAppConfig.tmdb.apikey;
    return this.http.get(country_url);
  }

  getGenreList(): Observable<any[]> {
    return this.genre;
  }

  getOrderList(): Observable<any[]> {
    return this.sortBy;
  }

  getSearchMovies(url: any): Observable<any> {
    return this.http.get(url);
  }

  getTrendingALLByDay():Observable<any>{
    return this.http.get(URL_CONSTANTS.GET_TRENDING_ALL_DAY);
  }

  getallMovies(url: any): Observable<any> {
    return this.http.get(url);
  }

  getTopGrossingMovies(url: any): Observable<any> {
    return this.http.get(url);
  }

  getUpcomingMovies(url: any): Observable<any> {
    return this.http.get(url);
  }

  getTrendingShowInPrime(url: any): Observable<any> {
    return this.http.get(url);
  }
  getMovieDetails(movie_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_MOVIE_BY_ID(movie_id));
  }
  getAllCollections(url: any) {
    return this.http.get(url);
  }

  getCollectionDetails(id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_COLLECTION_BY_ID(id));
  }
  getAllImages(movie_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_MOVIE_IMAGES_BY_ID(movie_id));
  }

  getMovieReviews(movie_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_MOVIE_REVIEWS_BY_ID(movie_id));
  }

  getMovieCredits(movie_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_MOVIE_CREDITS_BY_ID(movie_id));
  }

  getSimilarMovies(movie_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_MOVIE_SIMILAR_BY_ID(movie_id));
  }

  getRecommendedMovies(movie_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_MOVIE_RECOMMENDED_BY_ID(movie_id));
  }

  getVideos(movie_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_MOVIE_VIDEOS_BY_ID(movie_id));
  }

  getWatchProviders(movie_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_MOVIE_WATCH_PROVIDER_BY_ID(movie_id));
  }
}
