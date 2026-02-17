import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from 'src/app/core/interface/movie-details';
import myAppConfig from 'src/app/core/config/my-app-config';
import { MoviesService } from 'src/app/core/services/movies.service';
import { forkJoin } from 'rxjs';

var movie_id = 0;
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css'],
})
export class MovieDetailsComponent implements OnInit {
  imgUrl: string = myAppConfig.tmdb.imgUrl;
  highqualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;

  movieDetails: MovieDetails = {} as MovieDetails;
  background_video: any;

  windowScrolled: boolean = false;
  background_video_type: any;
  isLoading: boolean = true;
  activeTab: string = 'backdrops';
  tabConfig = [
    { id: 'backdrops', label: 'Backdrops', hasData: () => this.movieDetails.backdropList?.length > 0 },
    { id: 'posters', label: 'Posters', hasData: () => this.movieDetails.posterList?.length > 0 },
    { id: 'videos', label: 'Videos', hasData: () => this.movieDetails.videoList?.length > 0 },
    { id: 'cast', label: 'Cast', hasData: () => this.movieDetails.castList?.length > 0 },
    { id: 'crew', label: 'Crew', hasData: () => this.movieDetails.crewList?.length > 0 },
    { id: 'recommended', label: 'Recommended', hasData: () => this.movieDetails.recmovieList?.length > 0 },
    { id: 'similar', label: 'Similar', hasData: () => this.movieDetails.similarmovieList?.length > 0 },
    { id: 'reviews', label: 'Reviews', hasData: () => this.movieDetails.reviewList?.length > 0 },
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieservice: MoviesService,
    private _sanitizer: DomSanitizer
  ) {
    let id = this.route.snapshot?.params['id'];
    movie_id = id;

    this.movieDetails.crewList = [];
    this.router?.navigateByUrl('/moviedetails/' + movie_id);
    // Don't call getMovieDetails here - will be called in ngOnInit
  }
  ngOnInit(): void {
    const id = this.route.snapshot?.params['id'];
    this.getMovieDetails(id);
  }

  ngOnDestroy(): void {
    this.movieDetails = {} as MovieDetails;
  }

  getMovieDetails(id: number) {
    this.isLoading = true;

    forkJoin([
      this.movieservice.getMovieDetails(id),
      this.movieservice.getVideos(id),
      this.movieservice.getAllImages(id),
      this.movieservice.getWatchProviders(id),
      this.movieservice.getMovieCredits(id),
      this.movieservice.getRecommendedMovies(id),
      this.movieservice.getSimilarMovies(id),
      this.movieservice.getMovieReviews(id),
    ]).subscribe(
      ([
        movieDetails,
        videos,
        allImages,
        watchProviders,
        movieCredits,
        recommendedMovies,
        similarMovies,
        movieReviews,
      ]) => {
        if (movieDetails !== null) {
          this.setMovieDetails(movieDetails);
          this.setWatchProvider(watchProviders, movieDetails.homepage);
        }
        if (videos.results.length > 0) {
          this.setVideoDetails(videos);
        }
        if (
          allImages.backdrops?.length > 0 ||
          allImages.logos?.length > 0 ||
          allImages.posters?.length > 0
        ) {
          this.setImages(allImages);
        }

        if (movieCredits.cast?.length > 0 || movieCredits.crew?.length > 0) {
          this.setMovieCredits(movieCredits);
        }
        if (recommendedMovies.results.length > 0) {
          this.setRecommendedMovies(recommendedMovies);
        }

        if (similarMovies.results.length > 0) {
          this.setSimilarMovies(similarMovies);
        }
        if (movieReviews.results.length > 0) {
          this.setReviewDetails(movieReviews);
        }
        this.ensureActiveTab();
        this.isLoading = false;
      },
      (error) => {
        console.error('An error occurred while loading data:', error);
        this.isLoading = false; // Set isLoading to false if an error occurs during loading
      }
    );
  }
  setImages(allImages: any) {
    if (allImages.backdrops.length == '0') {
      this.movieDetails.background_image = null;
    } else {
      this.movieDetails.backdropList = allImages.backdrops;

      this.movieDetails.background_image =
        this.highqualityImgUrl + allImages.backdrops[0].file_path;

      setInterval(() => {
        const random = Math.floor(Math.random() * allImages.backdrops.length);
        this.movieDetails.background_image =
          this.highqualityImgUrl + allImages.backdrops[random].file_path;
      }, 30000);
    }

    //Movie Posters Images

    this.movieDetails.posterList = allImages.posters;

    let englishLogos: any[] = [];
    if (allImages.logos.length > 0) {
      allImages?.logos.forEach((logo: any) => {
        if (logo.iso_639_1 == 'en') {
          englishLogos.push(logo);
        }
      });
    }

    if (englishLogos.length > 0) {
      this.movieDetails.logoList = englishLogos[0];
    }
  }
  setReviewDetails(movieReviews: any) {
    movieReviews.results.forEach((review: any) => {
      if (review.author_details.avatar_path) {
        if (
          review.author_details.avatar_path[0] == '/' &&
          review.author_details.avatar_path[1] == 'h' &&
          review.author_details.avatar_path[2] == 't' &&
          review.author_details.avatar_path[3] == 't' &&
          review.author_details.avatar_path[4] == 'p'
        ) {
          let avatar_path = review.author_details.avatar_path.substring(1);
          review.author_details.avatar_path = avatar_path;
        } else if (
          review.author_details.avatar_path[0] !== 'h' &&
          review.author_details.avatar_path[1] !== 't' &&
          review.author_details.avatar_path[2] !== 't' &&
          review.author_details.avatar_path[3] !== 'p'
        ) {
          let avatar_path = this.imgUrl + review.author_details.avatar_path;
          review.author_details.avatar_path = avatar_path;
        }
      }
    });
    this.movieDetails.reviewList = movieReviews.results;
  }
  setMovieCredits(movieCredits: any) {
    let castList = movieCredits.cast;
    this.movieDetails.castList = castList;

    for (let i = 0; i < castList.length; i++) {
      this.movieDetails.castList[i].id = castList[i].id;
      this.movieDetails.castList[i].title = castList[i].name;
      this.movieDetails.castList[i].popularity = castList[i].popularity;
      this.movieDetails.castList[i].poster_path = castList[i].profile_path;
      this.movieDetails.castList[i].job = castList[i].known_for_department;
      this.movieDetails.castList[i].character = castList[i].character;
    }

    let c_data = this.filterCrewData(movieCredits.crew);

    this.movieDetails.crewList = c_data;

    for (let i = 0; i < c_data.length; i++) {
      this.movieDetails.crewList[i].id = c_data[i].id;
      this.movieDetails.crewList[i].title = c_data[i].name;
      this.movieDetails.crewList[i].popularity = c_data[i].popularity;
      this.movieDetails.crewList[i].poster_path = c_data[i].profile_path;
      this.movieDetails.crewList[i].job = c_data[i].known_for_department;
    }
  }
  setSimilarMovies(similarMovies: any) {
    for (let i = 0; i < similarMovies.results.length; i++) {
      if (similarMovies.results[i].poster_path == null) {
        similarMovies.results[i].poster_path = null;
      }
    }

    this.movieDetails.similarmovieList = similarMovies.results;
  }
  setRecommendedMovies(recommendedMovies: any) {
    for (let i = 0; i < recommendedMovies.length; i++) {
      if (recommendedMovies[i].poster_path == null) {
        recommendedMovies[i].poster_path = null;
      }
    }

    this.movieDetails.recmovieList = recommendedMovies;
  }

  setMovieDetails(movieDetails: any) {
    this.movieDetails.backdrop_path = movieDetails.backdrop_path;
    this.movieDetails.backdrop_path = movieDetails.backdrop_path;
    this.movieDetails.budget = movieDetails.budget;
    this.movieDetails.homepage = movieDetails.homepage;
    this.movieDetails.id = movieDetails.id;
    this.movieDetails.imdb_id = movieDetails.imdb_id;
    this.movieDetails.original_lan = movieDetails.original_language;
    this.movieDetails.original_title = movieDetails.original_title;
    this.movieDetails.overview = movieDetails.overview;
    this.movieDetails.popularity = movieDetails.popularity;
    this.movieDetails.poster_path = movieDetails.poster_path;
    this.movieDetails.production_companies = movieDetails.production_companies;
    this.movieDetails.production_countries = movieDetails.production_countries;
    this.movieDetails.runtime = movieDetails.runtime;
    this.movieDetails.genre = movieDetails.genres;
    this.movieDetails.release_date = movieDetails.release_date;
    this.movieDetails.revenue = movieDetails.revenue;
    this.movieDetails.status = movieDetails.status;
    this.movieDetails.vote_average = movieDetails.vote_average;
  }

  setVideoDetails(videos: any) {
    this.movieDetails.videoList = [];
    this.movieDetails.videoList = videos.results;

    if (this.movieDetails.videoList.length > 0) {
      this.movieDetails.videoList.forEach((video: any) => {
        video.videoThumbnail =
          myAppConfig.tmdb.thumbnailUrl + video.key + '/0.jpg';
      });
    }
    var max: any = null;
    var min: any = null;
    for (let i = 0; i < this.movieDetails.videoList.length; i++) {
      if (this.movieDetails.videoList[i].key) {
        var current = this.movieDetails.videoList[i];
        if (max === null || current.published_at > max.published_at) {
          max = current;
        }
        if (min === null || current.published_at < min.published_at) {
          min = current;
        }
      } else {
        this.movieDetails.videoList[i].key = null;
        this.movieDetails.videoList[i].videoThumbnail = null;
      }
    }
    if (max !== null) {
      this.background_video = this._sanitizer.bypassSecurityTrustResourceUrl(
        myAppConfig.tmdb.videoUrl + max.key + '?autoplay=1&controls=0&rel=0'
      );
      this.background_video_type = max.type;
    }

    this.movieDetails.videoList.forEach((video: any) => {
      video.key = this._sanitizer.bypassSecurityTrustResourceUrl(
        myAppConfig.tmdb.videoUrl + video.key + '?autoplay=1'
      );
    });
  }
  setWatchProvider(watchProviders: any, homepage: string) {
    const providerLink = this.extractWatchProviderLink(watchProviders);
    this.movieDetails.watchprovider = providerLink || homepage || null;
  }

  extractWatchProviderLink(watchProviders: any): string | null {
    const providerResults = watchProviders?.results || {};
    const preferredRegions = ['IN', 'US'];

    for (const region of preferredRegions) {
      if (providerResults?.[region]?.link) {
        return providerResults[region].link;
      }
    }

    const firstRegionWithLink = Object.values(providerResults).find(
      (provider: any) => provider?.link
    ) as any;
    return firstRegionWithLink?.link || null;
  }

  filterCrewData(arr: any): any {
    let clientImages: any = [];
    var c_data: any = [];
    c_data = arr;
    for (var i = 0; i < c_data.length; i++) {
      if (clientImages[c_data[i].id]) {
        if (clientImages[c_data[i].id].includes(c_data[i].job)) {
          continue;
        } else {
          clientImages[c_data[i].id] =
            clientImages[c_data[i].id] + ', ' + c_data[i].job;
        }
      } else {
        clientImages[c_data[i].id] = c_data[i].job;
      }
    }

    //remove duplicate entries
    c_data = c_data.filter((obj: any, pos: any, arr: any) => {
      return arr.map((mapObj: any) => mapObj.id).indexOf(obj.id) == pos;
    });

    clientImages.forEach((res: any) => {
      for (let i = 0; i < c_data.length; i++) {
        if (clientImages[c_data[i].id]) {
          c_data[i].job = clientImages[c_data[i].id];
        }
      }
    });
    return c_data;
  }

  float2int(value: any) {
    return value | 0;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 1000) {
      this.windowScrolled = true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  getMovieId(id: number) {
    this.router.navigateByUrl('/moviedetails/' + id);
    this.getMovieDetails(id);
  }

  getMovieDetailsById(id: number) {
    this.router.navigateByUrl('/moviedetails/' + id);
    this.getMovieDetails(id);
  }
  
  getMovieDetailsById1(id: number) {
  }

  getAvailableTabs() {
    return this.tabConfig.filter((tab) => tab.hasData());
  }

  setActiveTab(tabId: string) {
    this.activeTab = tabId;
  }

  private ensureActiveTab() {
    const availableTabs = this.getAvailableTabs();
    if (!availableTabs.length) {
      this.activeTab = '';
      return;
    }
    if (!availableTabs.some((tab) => tab.id === this.activeTab)) {
      this.activeTab = availableTabs[0].id;
    }
  }
}
