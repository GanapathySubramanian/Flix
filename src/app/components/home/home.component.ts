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
  upcomingMovieList: any[] = [];
  trendingTvList: any[] = [];

  highQualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;

  trendingMoviesTitle = 'Upcoming Movies';
  trendingTvshowsTitleInNetflix = 'Trending In Netflix';
  trendingTvshowsTitleInAmazon = 'Trending In Amazon';
  topGrossingMoviesList: any[] = [];
  topGrossingTvshowList: any[] = [];
  collections: any = [];
  collectionList: any;
  genreList: any[] = [];
  trendingInPrime: any[] = [];
  trendingInNetflix: any[] = [];
  constructor(
    private movieService: MoviesService,
    private tvshowService: TvshowsService
  ) {}

  ngOnInit(): void {
    let genrearr: any[] = [];
    this.movieService.getGenreList().subscribe((data) => {
      data.forEach((genre) => {
        genrearr.push(genre);
      });
    });
    this.tvshowService.getGenreList().subscribe((data) => {
      data.forEach((genre) => {
        genrearr.push(genre);
      });
    });
    this.genreList = genrearr.filter(
      (arr, index, self) => index === self.findIndex((t) => t.id === arr.id)
    );
    this.getPopularMovies();
    this.getPopularTvshow();
    this.getTrendingShowInPrime();
    this.getTrendingShowInNetflix();
    this.getTopGrossingMovies();
    this.getUpcomingMovies();
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
  getPopularTvshow() {
    let api_url =
      myAppConfig.tmdb.tvshowBaseUrl +
      myAppConfig.tmdb.apikey +
      '&sort_by=popularity.desc' +
      '&page=1';
    this.getTvshowsData(api_url);
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
      myAppConfig.tmdb.movieBaseUrl +
      '/movie/upcoming?' +
      myAppConfig.tmdb.apikey +
      '&page=1';
    this.getUpcomingMovieData(api_url);
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

  getTrendingShowInPrimeData(url: string) {
    this.movieService.getTrendingShowInPrime(url);
    let temptvhsowList: any;
    this.movieService.trendingInPrimeData.subscribe((data: any) => {
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
    this.movieService.getUpcomingMovies(url);
    let tempMoviesList: any;
    this.movieService.upcomingData.subscribe((data: any) => {
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
    this.tvshowService.getUpcomingTvshows(url);
    let tempMoviesList: any;
    this.tvshowService.upcomingTvshowData.subscribe((data: any) => {
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
          let m_genres: any[] = [];
          movies.genre_ids.forEach((genre: any) => {
            m_genres.push(this.genreList.find((o) => o.id === genre));
          });
          movies.genre_ids = m_genres;
          // this.trendingMoviesList.push(movies);

          if (index < 5) {
            this.getMovieImages(movies.id, index);
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
          let m_genres: any[] = [];
          tvshow.genre_ids.forEach((genre: any) => {
            m_genres.push(this.genreList.find((o) => o.id === genre));
          });
          tvshow.genre_ids = m_genres;
          this.trendingTvList.push(tvshow);
          tvshow.background_image =
            this.highQualityImgUrl + tvshow.backdrop_path;
          tvshow.no_animation = true;
          if (index < 5) {
            this.getTvshowImages(tvshow);
          }
        }
      });
    });
  }

  getTvshowImages(tvshow: any) {
    let backdrop_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/tv/' +
      tvshow.id +
      '/images?' +
      myAppConfig.tmdb.apikey;
    this.movieService.getAllImages(backdrop_url);
    let tempimagesData: any;
    this.movieService.movieallImageData.subscribe((data: any) => {
      tempimagesData = data;
      if (data.id === tvshow.id) {
        if (tempimagesData.logos.length < 0) {
          tvshow.logoList.file_path = null;
        } else {
          if (data.logos[0]) {
            tvshow.logoList = tempimagesData.logos[0];
          }
        }
        this.topMoviesList.push(tvshow);
      }
    });
  }

  getMovieImages(id: string, index: number) {
    let backdrop_url =
      myAppConfig.tmdb.movieBaseUrl +
      '/movie/' +
      id +
      '/images?' +
      myAppConfig.tmdb.apikey;
    this.movieService.getAllImages(backdrop_url);
    let tempimagesData: any;
    this.movieService.movieallImageData.subscribe((data: any) => {
      if (data.id === id) {
        tempimagesData = data;
        //Movie Logo Images
        if (tempimagesData.logos.length < 0) {
          this.topMoviesList[index].logoList.file_path = null;
        } else {
          this.topMoviesList[index].logoList = tempimagesData.logos[0];
        }
      }
    });
  }
}
