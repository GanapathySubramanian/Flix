import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import myAppConfig from '../config/my-app-config';
import { URL_CONSTANTS } from '../constants/url.constants';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  // Define movie category endpoints for trailers
  private movieCategories: Record<string, string> = {
    popular: `${myAppConfig.tmdb.baseUrl}movie/popular?${myAppConfig.tmdb.apikey}&language=en-US&page=1`,
    topRated: `${myAppConfig.tmdb.baseUrl}movie/top_rated?${myAppConfig.tmdb.apikey}&language=en-US&page=1`,
    upcoming: `${myAppConfig.tmdb.baseUrl}movie/upcoming?${myAppConfig.tmdb.apikey}&language=en-US&page=1`,
    nowPlaying: `${myAppConfig.tmdb.baseUrl}movie/now_playing?${myAppConfig.tmdb.apikey}&language=en-US&page=1`,
    trending: `${myAppConfig.tmdb.baseUrl}trending/movie/day?${myAppConfig.tmdb.apikey}&language=en-US&page=1`
  };

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
      'configuration/countries?' +
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
  getTvshowImages(movie_id: number): Observable<any> {
    return this.http.get(URL_CONSTANTS.GET_TVSHOW_IMAGES_BY_ID(movie_id));
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

  /**
   * Fetches movies by category and then gets their trailers
   * @param category - The category of movies to fetch (popular, topRated, upcoming, nowPlaying, trending)
   * @returns Observable with movie data including videos
   */
  getTrailersByCategory(category: string): Observable<any> {
    const url = this.movieCategories[category];
    if (!url) {
      console.error(`Invalid movie category: ${category}`);
      return of({ results: [] });
    }

    // First get movies by category
    return this.http.get(url).pipe(
      switchMap((data: any) => {
        if (!data || !data.results || data.results.length === 0) {
          return of({ results: [] });
        }
        
        // Take the top 10 movies
        const movies = data.results.slice(0, 10);
        
        // Create an array of observables, each fetching videos for a movie
        const movieWithVideosObservables = movies.map((movie: any) => {
          return this.getVideos(movie.id).pipe(
            map((videosData: any) => {
              // Find trailers in the videos
              const trailers = videosData.results?.filter((video: any) => 
                video.type.toLowerCase() === 'trailer' && 
                video.site.toLowerCase() === 'youtube'
              ) || [];
              
              // Return movie with trailer information
              return {
                ...movie,
                trailer: trailers.length > 0 ? trailers[0] : null,
                videoList: trailers
              };
            })
          );
        });
        
        // Combine all movie with videos observables
        return forkJoin(movieWithVideosObservables).pipe(
          map((moviesWithVideos: any[]) => {
            // Filter movies that have trailers
            return { 
              results: moviesWithVideos.filter((movie: any) => movie.trailer !== null)
            };
          }) as any
        );
      })
    );
  }
}
