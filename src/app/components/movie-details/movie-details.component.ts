import { Component, OnInit, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from 'src/app/core/interface/movie-details';
import myAppConfig from 'src/app/core/config/my-app-config';
import { MoviesService } from 'src/app/core/services/movies.service';

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
    this.getMovieDetails(movie_id);
  }
  ngOnInit(): void {}

  ngDestroy() {
    this.movieDetails = {} as MovieDetails;
  }

  getMovieDetails(id: number) {
    // To get the movie details

    this.getMovieDetailsData(id);

    //To get the movie images

    this.getMovieImages(id);

    //To get the reviews
    this.getReviews(id);

    //To get the crew and cast details
    this.getCredits(id);

    //To get the similar movies details
    this.getSimilarMovie(id);

    //To get the Recommended movies details
    this.getRecMovies(id);

    //To get the videos;
    this.getvideo(id);
  }

  getvideo(movie_id: number) {
    let videos: any;
    this.movieservice.getVideos(movie_id).subscribe((data) => {
      videos = data;
      this.movieDetails.videoList = [];
      this.movieDetails.videoList = videos.results;

      if (this.movieDetails.videoList.length > 0) {
        this.movieDetails.videoList.forEach((video: any) => {
          video.videoThumbnail =
            myAppConfig.tmdb.thumbnailUrl + video.key + '/0.jpg';
        });
      }
      console.log(this.movieDetails.videoList);

      for (let i = 0; i < this.movieDetails.videoList.length; i++) {
        if (this.movieDetails.videoList[i].key) {
          if (this.movieDetails.videoList[i].type == 'Trailer') {
            this.background_video =
              this._sanitizer.bypassSecurityTrustResourceUrl(
                myAppConfig.tmdb.videoUrl +
                  this.movieDetails.videoList[i].key +
                  '?autoplay=1&controls=0'
                // '?modestbranding=0&controls=0&fs=0&loop=1&showinfo=0&autoplay=1&mute=1&enablejsapi=1'
              );
          }
        } else {
          this.movieDetails.videoList[i].key = null;
          this.movieDetails.videoList[i].videoThumbnail = null;
        }

        if (!this.background_video) {
          if (this.movieDetails.videoList[i].type == 'Teaser') {
            console.log(this.movieDetails.videoList[i]);
            this.background_video =
              this._sanitizer.bypassSecurityTrustResourceUrl(
                myAppConfig.tmdb.videoUrl +
                  this.movieDetails.videoList[i].key +
                  '?autoplay=1&controls=0'
                // '?modestbranding=0&controls=0&fs=0&loop=1&showinfo=0&autoplay=1&mute=1&enablejsapi=1'
              );
          }
        }

        this.movieDetails.videoList[i].key =
          this._sanitizer.bypassSecurityTrustResourceUrl(
            myAppConfig.tmdb.videoUrl + this.movieDetails.videoList[i].key
          );
      }
    });
  }
  getWatchprovider(movie_id: number) {
    let watch: any;
    this.movieservice.getWatchProviders(movie_id).subscribe((data) => {
      watch = data;
      this.movieDetails.watchprovider = watch.results.IN[0]?.link;
    });
  }

  getRecMovies(movie_id: number) {
    let recmovie: any;
    this.movieservice.getRecommendedMovies(movie_id).subscribe((data: any) => {
      recmovie = data.results;

      for (let i = 0; i < recmovie.length; i++) {
        if (recmovie[i].poster_path == null) {
          recmovie[i].poster_path = null;
        }
      }

      this.movieDetails.recmovieList = recmovie;
    });
  }

  getSimilarMovie(movie_id: number) {
    let similarmovie: any;
    this.movieservice.getSimilarMovies(movie_id).subscribe((data) => {
      similarmovie = data;

      for (let i = 0; i < similarmovie.results.length; i++) {
        if (similarmovie.results[i].poster_path == null) {
          similarmovie.results[i].poster_path = null;
        }
      }

      this.movieDetails.similarmovieList = similarmovie.results;
    });
  }

  getCredits(movie_id: number) {
    let tempcreditData: any;
    this.movieservice.getMovieCredits(movie_id).subscribe((data) => {
      tempcreditData = data;

      let castList = tempcreditData.cast;
      this.movieDetails.castList = castList;

      for (let i = 0; i < castList.length; i++) {
        this.movieDetails.castList[i].id = castList[i].id;
        this.movieDetails.castList[i].title = castList[i].name;
        this.movieDetails.castList[i].popularity = castList[i].popularity;
        this.movieDetails.castList[i].poster_path = castList[i].profile_path;
        this.movieDetails.castList[i].job = castList[i].known_for_department;
        this.movieDetails.castList[i].character = castList[i].character;
      }

      let c_data = this.filterCrewData(tempcreditData.crew);

      this.movieDetails.crewList = c_data;

      for (let i = 0; i < c_data.length; i++) {
        this.movieDetails.crewList[i].id = c_data[i].id;
        this.movieDetails.crewList[i].title = c_data[i].name;
        this.movieDetails.crewList[i].popularity = c_data[i].popularity;
        this.movieDetails.crewList[i].poster_path = c_data[i].profile_path;
        this.movieDetails.crewList[i].job = c_data[i].known_for_department;
      }
    });
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

  getReviews(movie_id: number) {
    let tempreviewData: any;
    this.movieservice.getMovieReviews(movie_id).subscribe((data) => {
      tempreviewData = data;

      tempreviewData.results.forEach((review: any) => {
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
      this.movieDetails.reviewList = tempreviewData.results;
    });
  }

  getMovieImages(movie_id: number) {
    let tempimagesData: any;
    this.movieservice.getAllImages(movie_id).subscribe((data) => {
      tempimagesData = data;

      if (tempimagesData.backdrops.length == '0') {
        this.movieDetails.background_image = null;
      } else {
        this.movieDetails.backdropList = tempimagesData.backdrops;

        this.movieDetails.background_image =
          this.highqualityImgUrl + tempimagesData.backdrops[0].file_path;

        setInterval(() => {
          const random = Math.floor(
            Math.random() * tempimagesData.backdrops.length
          );
          this.movieDetails.background_image =
            this.highqualityImgUrl + tempimagesData.backdrops[random].file_path;
        }, 5000);
      }

      //Movie Posters Images

      this.movieDetails.posterList = tempimagesData.posters;

      let englishLogos: any[] = [];
      if (tempimagesData.logos.length > 0) {
        tempimagesData?.logos.forEach((logo: any) => {
          if (logo.iso_639_1 == 'en') {
            englishLogos.push(logo);
          }
        });
      }

      if (englishLogos.length > 0) {
        this.movieDetails.logoList = englishLogos[0];
      }
    });
  }

  getMovieDetailsData(id: number) {
    let tempMovieDetails: any;
    this.movieservice.getMovieDetails(id).subscribe((data) => {
      tempMovieDetails = data;

      //Default Movie Details
      this.movieDetails.backdrop_path = tempMovieDetails.backdrop_path;
      this.movieDetails.backdrop_path = tempMovieDetails.backdrop_path;
      this.movieDetails.budget = tempMovieDetails.budget;
      this.movieDetails.homepage = tempMovieDetails.homepage;
      this.movieDetails.id = tempMovieDetails.id;
      this.movieDetails.imdb_id = tempMovieDetails.imdb_id;
      this.movieDetails.original_lan = tempMovieDetails.original_language;
      this.movieDetails.original_title = tempMovieDetails.original_title;
      this.movieDetails.overview = tempMovieDetails.overview;
      this.movieDetails.popularity = tempMovieDetails.popularity;
      this.movieDetails.poster_path = tempMovieDetails.poster_path;
      this.movieDetails.production_companies =
        tempMovieDetails.production_companies;
      this.movieDetails.production_countries =
        tempMovieDetails.production_countries;
      this.movieDetails.runtime = tempMovieDetails.runtime;
      this.movieDetails.genre = tempMovieDetails.genres;
      this.movieDetails.release_date = tempMovieDetails.release_date;
      this.movieDetails.revenue = tempMovieDetails.revenue;
      this.movieDetails.status = tempMovieDetails.status;
      this.movieDetails.vote_average = tempMovieDetails.vote_average;

      if (tempMovieDetails.homepage == '') {
        this.getWatchprovider(movie_id);
      } else {
        this.movieDetails.watchprovider = tempMovieDetails.homepage;
      }
    });
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
}
