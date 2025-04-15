import { Component, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';
import { MoviesService } from 'src/app/core/services/movies.service';
import { TvshowsService } from 'src/app/core/services/tvshows.service';
import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  upcomingMovieList: any[] = [];
  trendingTvList: any[] = [];

  highQualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;

  trendingMoviesTitle = 'Upcoming Movies';
  trendingTvshowsTitleInNetflix = 'Trending In Netflix';
  trendingTvshowsTitleInAmazon = 'Trending In Amazon';
  topGrossingMovies = "Top Grossing Movies"
  topGrossingMoviesList: any[] = [];
  topGrossingTvshowList: any[] = [];
  collections: any = [];
  collectionList: any;
  genreList: any[] = [];
  trendingInPrime: any[] = [];
  trendingInNetflix: any[] = [];
  trendingList: any[] = [];
  
  // Trending categories section
  trendingCategories = [
    { id: 'upcoming', name: 'Upcoming' },
    { id: 'netflix', name: 'Netflix' },
    { id: 'amazon', name: 'Amazon Prime' },
    { id: 'topGrossing', name: 'Top Grossing' }
  ];
  activeTrendingCategory: string = 'upcoming';
  constructor(
    private movieService: MoviesService,
    private tvshowService: TvshowsService
  ) {}

  ngOnInit(): void {
    let genrearr: any[] = [];
    forkJoin([
      this.movieService.getGenreList(),
      this.tvshowService.getGenreList()
    ]).subscribe({
      next: (([movieGenres, tvshowGenres]: [any[], any[]]) => {
        genrearr.push(...movieGenres);
        genrearr.push(...tvshowGenres);

        this.genreList = genrearr.filter(
          (arr, index, self) => index === self.findIndex((t) => t.id === arr.id)
        );
        
        // Load data sequentially to prevent overwhelming the browser
        this.getTrendingShowInPrime();
        setTimeout(() => this.getTrendingShowInNetflix(), 100);
        setTimeout(() => this.getTopGrossingMovies(), 200);
        setTimeout(() => this.getUpcomingMovies(), 300);
        setTimeout(() => this.getTrendingAllByDays(), 400);
      }),
      error: (err: any) => {
        console.error('Error fetching genre data:', err);
      }
    });
    
    // Remove premature sorting - this will be done after data is loaded
  }
  getTrendingAllByDays() {
    // Clear the list first to prevent duplicate additions
    this.trendingList = [];
    
    // Create a temporary array for processing
    let tempTrendingList: any[] = [];
    
    // First, get the trending data
    this.movieService.getTrendingALLByDay().pipe(
      tap((data: any) => {
        // Process all items but don't add to trendingList yet
        tempTrendingList = this.processTrendingDataToArray(data.results);
      }),
      switchMap((data: any) => {
        // Only fetch additional image data for the first 5 items (visible in carousel)
        const visibleItems = data.results
          .filter((movie: any) => movie.backdrop_path !== null)
          .slice(0, 5);
        
        // If no items need additional data, return empty array
        if (visibleItems.length === 0) {
          return of([]);
        }
        
        // Create observables for movie image requests
        const movieRequests = visibleItems
          .filter((item: any) => item.media_type === 'movie')
          .map((movie: any) => this.movieService.getAllImages(movie.id).pipe(
            map((imageData: any) => ({ movie, imageData }))
          ));
        
        // Create observables for TV show image requests
        const tvRequests = visibleItems
          .filter((item: any) => item.media_type === 'tv')
          .map((tvshow: any) => this.movieService.getTvshowImages(tvshow.id).pipe(
            map((imageData: any) => ({ movie: tvshow, imageData }))
          ));
        
        // Combine all requests into a single observable that emits when all are complete
        return forkJoin([...movieRequests, ...tvRequests]);
      })
    ).subscribe({
      next: (results: any[]) => {
        // Process the batch results
        results.forEach(({ movie, imageData }: { movie: any, imageData: any }) => {
          // Find the movie in our temp list and update it
          const existingMovie = tempTrendingList.find((m: any) => m.id === movie.id);
          if (existingMovie && imageData && imageData.logos) {
            this.processImageDataForMovie(existingMovie, imageData);
          }
        });
        
        // Only now assign to the actual trendingList
        this.trendingList = [...tempTrendingList];
        
        // Sort the list after all items are added
        this.trendingList.sort((a: any, b: any) => b.popularity - a.popularity);
      },
      error: (err: any) => {
        console.error('Error fetching trending data:', err);
        // Ensure trendingList has some value even on error
        if (!this.trendingList.length) {
          this.trendingList = [];
        }
      }
    });
  }

  // New helper method that returns processed data instead of modifying trendingList
  private processTrendingDataToArray(items: any[]): any[] {
    const result: any[] = [];
    
    items.forEach((movie: any) => {
      if (movie.backdrop_path !== null) {
        const processedMovie = { ...movie }; // Create a copy to avoid reference issues
        processedMovie.background_image = this.highQualityImgUrl + movie.backdrop_path;
        processedMovie.no_animation = true;
        
        // Process genre data
        let m_genres: any[] = [];
        if (processedMovie.genre_ids) {
          processedMovie.genre_ids.forEach((genre: any) => {
            const foundGenre = this.genreList.find((o) => o.id === genre);
            if (foundGenre) {
              m_genres.push(foundGenre);
            }
          });
          processedMovie.genre_ids = m_genres;
        }
        
        // Add to result array
        result.push(processedMovie);
      }
    });
    
    return result;
  }

  // New helper method to process image data for a specific movie
  private processImageDataForMovie(movie: any, imageData: any): void {
    let englishLogos: any[] = [];
    if (imageData.logos && imageData.logos.length > 0) {
      imageData.logos.forEach((logo: any) => {
        if (logo.iso_639_1 === 'en') {
          englishLogos.push(logo);
        }
      });
    }
    if (englishLogos.length > 0) {
      movie.logoList = englishLogos[0];
    }
  }

  getTrendingShowInPrime() {
    let api_url =
      myAppConfig.tmdb.tvshowBaseUrl +
      myAppConfig.tmdb.apikey +
      '&page=1&sort_by=popularity.desc&with_networks=1024';
    this.getTrendingShowInPrimeData(api_url);
  }
  getTrendingShowInNetflix() {
    let api_url =
      myAppConfig.tmdb.tvshowBaseUrl +
      myAppConfig.tmdb.apikey +
      '&page=1&sort_by=popularity.desc&with_networks=213';
    this.getTrendingShowInNetflixData(api_url);
  }
  getUpcomingMovies() {
    let api_url =
      myAppConfig.tmdb.baseUrl +
      'movie/upcoming?' +
      myAppConfig.tmdb.apikey +
      '&page=1';
    this.getUpcomingMovieData(api_url);
  }
  getTopGrossingMovies() {
    let api_url =
      myAppConfig.tmdb.baseUrl +
      'discover/movie?sort_by=revenue.desc' +
      '&' +
      myAppConfig.tmdb.apikey +
      '&page=1';
    this.getTopGrossingMovieData(api_url);
  }


  getTrendingShowInPrimeData(url: string) {
    let temptvhsowList: any;
    this.movieService.getTrendingShowInPrime(url).subscribe((data: any) => {
      temptvhsowList = data.results;
      temptvhsowList.forEach((movies: any, index: number) => {
        if (movies.backdrop_path !== null) {
          movies.background_image =
            this.highQualityImgUrl + movies.backdrop_path;
          movies.no_animation = true;
          let m_genres: any[] = [];
          movies.genre_ids.forEach((genre: any) => {
            m_genres.push(this.genreList.find((o) => o.id === genre));
          });
          movies.genre_ids = m_genres;
          if (movies) {
            this.trendingInPrime.push(movies);
          }
        }
      });
    });
  }
  getUpcomingMovieData(url: string) {
    let tempMoviesList: any;
    this.movieService.getUpcomingMovies(url).subscribe((data: any) => {
      tempMoviesList = data.results;
      tempMoviesList.forEach((movies: any, index: number) => {
        if (movies.backdrop_path !== null) {
          movies.background_image =
            this.highQualityImgUrl + movies.backdrop_path;
          movies.no_animation = true;
          let m_genres: any[] = [];
          movies.genre_ids.forEach((genre: any) => {
            m_genres.push(this.genreList.find((o) => o.id === genre));
          });
          movies.genre_ids = m_genres;
          this.upcomingMovieList.push(movies);
        }
      });
    });
  }
  getTrendingShowInNetflixData(url: string) {
    let tempMoviesList: any;
    this.tvshowService.getUpcomingTvshows(url).subscribe((data: any) => {
      tempMoviesList = data.results;
      tempMoviesList.forEach((movies: any, index: number) => {
        if (movies.backdrop_path !== null) {
          movies.background_image =
            this.highQualityImgUrl + movies.backdrop_path;
          movies.no_animation = true;
          let m_genres: any[] = [];
          movies.genre_ids.forEach((genre: any) => {
            m_genres.push(this.genreList.find((o) => o.id === genre));
          });
          movies.genre_ids = m_genres;
          this.trendingInNetflix.push(movies);
        }
      });
    });
  }
  getTopGrossingMovieData(url: string) {
    let tempMoviesList: any;
    this.movieService.getTopGrossingMovies(url).subscribe((data: any) => {
      tempMoviesList = data.results;
      tempMoviesList.forEach((movies: any, index: number) => {
        if (movies.backdrop_path !== null) {
          movies.background_image =
            this.highQualityImgUrl + movies.backdrop_path;

          movies.no_animation = true;
          if (index <= 10) {
            this.topGrossingMoviesList.push(movies);
          }
        }
      });
    });
  }
  
  // Method to change active trending category
  changeTrendingCategory(categoryId: string): void {
    this.activeTrendingCategory = categoryId;
  }
}
