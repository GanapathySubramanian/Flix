import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, Subject } from 'rxjs';
import myAppConfig from '../config/my-app-config';

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
      myAppConfig.tmdb.movieBaseUrl +
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
    let api_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/movie/' +
      movie_id +
      '?' +
      myAppConfig.tmdb.apikey;
    return this.http.get(api_url);
  }
  getAllCollections(url: any) {
    return this.http.get(url);
  }

  getCollectionDetails(id: number): Observable<any> {
    var api_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/collection/' +
      id +
      '?' +
      myAppConfig.tmdb.apikey;
    return this.http.get(api_url);
  }
  getAllImages(movie_id: number): Observable<any> {
    let backdrop_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/movie/' +
      movie_id +
      '/images?' +
      myAppConfig.tmdb.apikey;
    return this.http.get(backdrop_url);
  }

  getMovieReviews(movie_id: number): Observable<any> {
    let reviews_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/movie/' +
      movie_id +
      '/reviews?' +
      myAppConfig.tmdb.apikey;
    return this.http.get(reviews_url);
  }

  getMovieCredits(movie_id: number): Observable<any> {
    let credits_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/movie/' +
      movie_id +
      '/credits?' +
      myAppConfig.tmdb.apikey;
    return this.http.get(credits_url);
  }

  getSimilarMovies(movie_id: number): Observable<any> {
    let similar_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/movie/' +
      movie_id +
      '/similar?' +
      myAppConfig.tmdb.apikey;
    return this.http.get(similar_url);
  }

  getRecommendedMovies(movie_id: number): Observable<any> {
    let recmovie_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/movie/' +
      movie_id +
      '/recommendations?' +
      myAppConfig.tmdb.apikey;
    return this.http.get(recmovie_url);
  }

  getVideos(movie_id: number): Observable<any> {
    let URL =
      myAppConfig.tmdb.movieBaseUrl +
      '/movie/' +
      movie_id +
      '/videos?' +
      myAppConfig.tmdb.apikey;
    return this.http.get(URL);
  }

  getWatchProviders(movie_id: number): Observable<any> {
    var watch_provider =
      myAppConfig.tmdb.movieBaseUrl +
      '/movie/' +
      movie_id +
      '/watch/providers?' +
      myAppConfig.tmdb.apikey;
    return this.http.get(watch_provider);
  }
}
