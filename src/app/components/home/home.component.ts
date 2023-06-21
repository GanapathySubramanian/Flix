import { Component, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';
import { MoviesService } from 'src/app/core/services/movies.service';
import { TvshowsService } from 'src/app/core/services/tvshows.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  topMoviesList: any[] = [];
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
  trendingList: any[]=[];
  constructor(
    private movieService: MoviesService,
    private tvshowService: TvshowsService
  ) {}

  ngOnInit(): void {
    let genrearr: any[] = [];
    forkJoin([
      this.movieService.getGenreList(),
      this.tvshowService.getGenreList()
    ]).subscribe((([movieGenres, tvshowGenres])=>{
      genrearr.push(...movieGenres);
      genrearr.push(...tvshowGenres);

      this.genreList = genrearr.filter(
        (arr, index, self) => index === self.findIndex((t) => t.id === arr.id)
      );
      this.getTrendingShowInPrime();
      this.getTrendingShowInNetflix();
      this.getTopGrossingMovies();
      this.getUpcomingMovies();
      this.getTrendingAllByDays();
    }))
 
  }
  getTrendingAllByDays() {
  this.movieService.getTrendingALLByDay().subscribe((data)=>{
    let temptvhsowList = data.results;
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
            this.getTrendingImages(movies)
          }
        }
      });
  })  
  }

  getTrendingImages(movie: any) {
    let tempimagesData: any;
    this.movieService.getAllImages(movie.id).subscribe((data: any) => {
      if (data.id === movie.id) {
        tempimagesData = data;
        let englishLogos: any[] = [];
        if (tempimagesData.logos.length > 0) {
          tempimagesData?.logos.forEach((logo: any) => {
            if (logo.iso_639_1 == 'en') {
              englishLogos.push(logo);
            }
          });
        }
        if (englishLogos.length > 0) {
          movie.logoList = englishLogos[0];
        }

        this.trendingList.push(movie);
      }
    });
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
 
}
