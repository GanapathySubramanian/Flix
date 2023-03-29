import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TvshowDetails } from 'src/app/core/interface/tvshow-details';
import myAppConfig from 'src/app/core/config/my-app-config';
import { TvshowsService } from 'src/app/core/services/tvshows.service';
import { common } from 'src/app/core/interface/common';

var tvshow_id = 0;
@Component({
  selector: 'app-tvshow-details',
  templateUrl: './tvshow-details.component.html',
  styleUrls: ['./tvshow-details.component.css'],
})
export class TvshowDetailsComponent implements OnInit {
  imgUrl: string = myAppConfig.tmdb.imgUrl;
  highqualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;

  tvshowDetails: TvshowDetails = {} as TvshowDetails;

  windowScrolled: boolean = false;
  background_video: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tvshowservice: TvshowsService,
    private _sanitizer: DomSanitizer
  ) {
    let id = this.route.snapshot.params['id'];
    tvshow_id = id;
    this.router.navigateByUrl('/tvshowdetails/' + tvshow_id);

    this.getTvshowDetails(tvshow_id);
  }

  ngOnInit(): void {}

  getTvshowDetails(tvshow_id: number) {
    // To get the Tvshow details

    this.gettvshowDetailsData(tvshow_id);

    //To get the Tvshow images
    this.gettvshowImages(tvshow_id);

    //To get the reviews
    this.getReviews(tvshow_id);

    //To get the crew and cast details
    this.getCredits(tvshow_id);

    //To get the similar tvshows details
    this.getSimilartvshow(tvshow_id);

    //To get the Recommended tvshows details
    this.getRectvshows(tvshow_id);

    //To get the videos
    this.getvideo(tvshow_id);
  }

  getvideo(tvshow_id: number) {
    let videos: any;
    this.tvshowservice.getVideos(tvshow_id).subscribe((data) => {
      videos = data;

      this.tvshowDetails.videoList = videos.results;
      this.tvshowDetails.videoList.forEach((video: any) => {
        video.videoThumbnail =
          myAppConfig.tmdb.thumbnailUrl + video.key + '/0.jpg';
      });
      for (let i = 0; i < this.tvshowDetails.videoList.length; i++) {
        if (this.tvshowDetails.videoList[i].key) {
          if ((this.tvshowDetails.videoList[i].type = 'Teaser')) {
            this.background_video =
              this._sanitizer.bypassSecurityTrustResourceUrl(
                myAppConfig.tmdb.videoUrl +
                  this.tvshowDetails.videoList[i].key +
                  '?autoplay=1&controls=0'
                // '?modestbranding=0&controls=0&fs=0&loop=1&showinfo=0&autoplay=1&mute=1&enablejsapi=1'
              );
          } else if ((this.tvshowDetails.videoList[i].type = 'Trailer')) {
            this.background_video =
              this._sanitizer.bypassSecurityTrustResourceUrl(
                myAppConfig.tmdb.videoUrl +
                  this.tvshowDetails.videoList[i].key +
                  '?autoplay=1&controls=0'
                // '?modestbranding=0&controls=0&fs=0&loop=1&showinfo=0&autoplay=1&mute=1&enablejsapi=1'
              );
          }
          this.tvshowDetails.videoList[i].key =
            this._sanitizer.bypassSecurityTrustResourceUrl(
              myAppConfig.tmdb.videoUrl +
                this.tvshowDetails.videoList[i].key +
                '?autoplay=1'
            );
        } else {
          this.tvshowDetails.videoList[i].key = null;
        }
      }
    });
  }

  getRectvshows(tvshow_id: number) {
    let rectvshow: any;
    this.tvshowservice
      .getRecommendedtvshows(tvshow_id)
      .subscribe((data) => {
        rectvshow = data;

        for (let i = 0; i < rectvshow.results.length; i++) {
          if (rectvshow.results[i].poster_path == null) {
            rectvshow.results[i].poster_path = 'Empty';
          }
        }
        this.tvshowDetails.rectvshowList = rectvshow.results;
        let rec_tvshow = rectvshow.results;
        this.tvshowDetails.similartvshowList = rec_tvshow;
        for (let i = 0; i < rec_tvshow.length; i++) {
          this.tvshowDetails.rectvshowList[i].id = rec_tvshow[i].id;
          this.tvshowDetails.rectvshowList[i].title = rec_tvshow[i].name;
          this.tvshowDetails.rectvshowList[i].poster_path =
            rec_tvshow[i].poster_path;
          this.tvshowDetails.rectvshowList[i].vote_average =
            rec_tvshow[i].vote_average;
          this.tvshowDetails.rectvshowList[i].release_date =
            rec_tvshow[i].first_air_date;
        }
      });
  }
  getSimilartvshow(tvshow_id: number) {
    let similartvshow: any;
    this.tvshowservice.getSimilartvshows(tvshow_id).subscribe((data) => {
      similartvshow = data;
      for (let i = 0; i < similartvshow.results.length; i++) {
        if (similartvshow.results[i].poster_path == null) {
          similartvshow.results[i].poster_path = 'Empty';
        }
      }

      let s_tvshow = similartvshow.results;
      this.tvshowDetails.similartvshowList = s_tvshow;
      for (let i = 0; i < s_tvshow.length; i++) {
        this.tvshowDetails.similartvshowList[i].id = s_tvshow[i].id;
        this.tvshowDetails.similartvshowList[i].title = s_tvshow[i].name;
        this.tvshowDetails.similartvshowList[i].poster_path =
          s_tvshow[i].poster_path;
        this.tvshowDetails.similartvshowList[i].vote_average =
          s_tvshow[i].vote_average;
        this.tvshowDetails.similartvshowList[i].release_date =
          s_tvshow[i].first_air_date;
      }
    });
  }

  getCredits(tvshow_id: number) {
    let tempcreditData: any;
    this.tvshowservice.gettvshowCredits(tvshow_id).subscribe((data) => {
      tempcreditData = data;

      let castList = tempcreditData.cast;
      this.tvshowDetails.castList = castList;

      for (let i = 0; i < castList.length; i++) {
        this.tvshowDetails.castList[i].id = castList[i].id;
        this.tvshowDetails.castList[i].title = castList[i].name;
        this.tvshowDetails.castList[i].popularity = castList[i].popularity;
        this.tvshowDetails.castList[i].poster_path = castList[i].profile_path;
        this.tvshowDetails.castList[i].job = castList[i].known_for_department;
        this.tvshowDetails.castList[i].character = castList[i].character;
      }

      let c_data = this.filterCrewData(tempcreditData.crew);
      this.tvshowDetails.crewList = c_data;

      for (let i = 0; i < c_data.length; i++) {
        this.tvshowDetails.crewList[i].id = c_data[i].id;
        this.tvshowDetails.crewList[i].title = c_data[i].name;
        this.tvshowDetails.crewList[i].popularity = c_data[i].popularity;
        this.tvshowDetails.crewList[i].poster_path = c_data[i].profile_path;
        this.tvshowDetails.crewList[i].job = c_data[i].known_for_department;
      }
    });
  }

  getReviews(tvshow_id: number) {
    let tempreviewData: any;
    this.tvshowservice.gettvshowReviews(tvshow_id).subscribe((data) => {
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
          } else {
            let avatar_path = this.imgUrl + review.author_details.avatar_path;
            review.author_details.avatar_path = avatar_path;
          }
        }
      });
      this.tvshowDetails.reviewList = tempreviewData.results;
    });
  }

  gettvshowImages(tvshow_id: number) {
    let tempimagesData: any;
    this.tvshowservice.getAllImages(tvshow_id).subscribe((data) => {
      tempimagesData = data;

      if (tempimagesData.backdrops.length == '0') {
        this.tvshowDetails.background_image = null;
      } else {
        this.tvshowDetails.backdropList = tempimagesData.backdrops;

        this.tvshowDetails.background_image =
          this.highqualityImgUrl + tempimagesData.backdrops[0].file_path;

        setInterval(() => {
          const random = Math.floor(
            Math.random() * tempimagesData.backdrops.length
          );
          this.tvshowDetails.background_image =
            this.highqualityImgUrl + tempimagesData.backdrops[random].file_path;
        }, 5000);
      }

      //Tvshow Posters Images

      this.tvshowDetails.posterList = tempimagesData.posters;

      let englishLogos: any[] = [];
      if (tempimagesData.logos.length > 0) {
        tempimagesData?.logos.forEach((logo: any) => {
          if (logo.iso_639_1 == 'en') {
            englishLogos.push(logo);
          }
        });
      }

      if (englishLogos.length > 0) {
        this.tvshowDetails.logoList = englishLogos[0];
      }
    });
  }

  gettvshowDetailsData(id: number) {
    let tempTvshowDetails: any;
    this.tvshowservice.gettvshowDetails(id).subscribe((data) => {
      tempTvshowDetails = data;

      //Default Tvshow Details
      this.tvshowDetails.backdrop_path = tempTvshowDetails.backdrop_path;
      this.tvshowDetails.episode_run_time = tempTvshowDetails.episode_run_time;
      this.tvshowDetails.avg_run_time = this.tvshowDetails.episode_run_time[0];
      for (let i = 0; i < this.tvshowDetails.episode_run_time.length; i++) {
        if (
          this.tvshowDetails.avg_run_time <
          this.tvshowDetails.episode_run_time[i]
        ) {
          this.tvshowDetails.avg_run_time =
            this.tvshowDetails.episode_run_time[i];
        }
      }
      this.tvshowDetails.first_air_date = tempTvshowDetails.first_air_date;
      this.tvshowDetails.genre = tempTvshowDetails.genres;
      this.tvshowDetails.homepage = tempTvshowDetails.homepage;
      this.tvshowDetails.id = tempTvshowDetails.id;
      this.tvshowDetails.original_lan = tempTvshowDetails.original_language;
      this.tvshowDetails.last_air_date = tempTvshowDetails.last_air_date;
      this.tvshowDetails.last_episode_to_air =
        tempTvshowDetails.last_episode_to_air;
      this.tvshowDetails.networks = tempTvshowDetails.networks;
      this.tvshowDetails.no_of_episodes = tempTvshowDetails.number_of_episodes;
      this.tvshowDetails.no_of_seasons = tempTvshowDetails.number_of_seasons;
      this.tvshowDetails.original_title = tempTvshowDetails.original_name;
      this.tvshowDetails.overview = tempTvshowDetails.overview;
      this.tvshowDetails.popularity = tempTvshowDetails.popularity;
      this.tvshowDetails.poster_path = tempTvshowDetails.poster_path;
      this.tvshowDetails.production_companies =
        tempTvshowDetails.production_companies;
      this.tvshowDetails.production_countries =
        tempTvshowDetails.production_countries;
      this.tvshowDetails.seasons = tempTvshowDetails.seasons;
      this.tvshowDetails.status = tempTvshowDetails.status;
      this.tvshowDetails.tagline = tempTvshowDetails.tagline;
      this.tvshowDetails.vote_average = tempTvshowDetails.vote_average;
      this.tvshowDetails.vote_count = tempTvshowDetails.vote_count;

      // To Remove other than seasons
      // for(let i=0;i<this.tvshowDetails.seasons.length;i++){
      //   if(this.tvshowDetails.seasons[i].season_number==0){
      //     this.tvshowDetails.seasons.splice(i, 1);
      //   }
      // }

      if (this.tvshowDetails.homepage == '') {
        var watch_provider =
          myAppConfig.tmdb.tvshowDetailsBaseUrl +
          tvshow_id +
          '/watch/providers?' +
          myAppConfig.tmdb.apikey;
        this.getWatchprovider(watch_provider);
      } else {
        this.tvshowDetails.watchprovider = this.tvshowDetails.homepage;
      }
    });
  }

  getWatchprovider(watch_provider: string) {
    let watch: any;
    this.tvshowservice.getWatchProviders(watch_provider).subscribe((data) => {
      watch = data;
      this.tvshowDetails.watchprovider = watch.results.IN.link;
    });
  }

  float2int(value: any) {
    return value | 0;
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
