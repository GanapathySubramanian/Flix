import { Component, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';
import { MoviesService } from 'src/app/core/services/movies.service';
import { TvshowsService } from 'src/app/core/services/tvshows.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  topMoviesList: any[] = [];
  trendingMoviesList: any[] = [];
  trendingTvList: any[] = [];

  highQualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;

  trendingMoviesTitle = 'Trending Movies';
  trendingTvshowsTitle = 'Trending Tvshows';
  topGrossingMoviesList: any[] = [];
  topGrossingTvshowList: any[] = [];
  collections: any = [];
  collectionList: any;

  constructor(
    private movieService: MoviesService,
    private tvshowService: TvshowsService
  ) {}

  ngOnInit(): void {
    this.getPopularMovies();
    this.getPopularTvShows();
    this.getTopGrossingMovies();
  }

  getPopularMovies() {
    let api_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/discover/movie?sort_by=popularity.desc' +
      '&' +
      myAppConfig.tmdb.apikey +
      '&page=1';
    this.getMoviesData(api_url);
  }
  getPopularTvShows() {
    let api_url =
      myAppConfig.tmdb.tvshowBaseUrl +
      myAppConfig.tmdb.apikey +
      '&sort_by=popularity.desc' +
      '&page=1';
    this.getTvshowsData(api_url);
  }

  getTopGrossingMovies() {
    let api_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/discover/movie?sort_by=revenue.desc' +
      '&' +
      myAppConfig.tmdb.apikey +
      '&page=1';
    this.getTopGrossingMovieData(api_url);
  }

  getTopGrossingMovieData(url: string) {
    this.movieService.getTopGrossingMovies(url);
    let tempMoviesList: any;
    this.movieService.topGrossingData.subscribe((data: any) => {
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
  getMoviesData(url: string) {
    this.movieService.getallMovies(url);
    let tempMoviesList: any;
    this.movieService.moviesData.subscribe((data: any) => {
      tempMoviesList = data.results;
      tempMoviesList.forEach((movies: any, index: number) => {
        if (movies.backdrop_path !== null) {
          movies.background_image =
            this.highQualityImgUrl + movies.backdrop_path;
          movies.no_animation = true;
          this.trendingMoviesList.push(movies);
          if (index < 5) {
            this.topMoviesList.push(movies);
          }
        }
      });
    });
  }

  getTvshowsData(api_url: string) {
    this.tvshowService.getallTvshows(api_url);
    let tempTvshowList: any;
    this.tvshowService.tvshowsData.subscribe((data: any) => {
      tempTvshowList = data.results;
      tempTvshowList.forEach((tvshow: any, index: number) => {
        if (tvshow.backdrop_path !== null) {
          this.trendingTvList.push(tvshow);
          tvshow.background_image =
            this.highQualityImgUrl + tvshow.backdrop_path;
          tvshow.no_animation = true;
          if (index < 5) {
            this.topMoviesList.push(tvshow);
          }
        }
      });
    });
  }
}
