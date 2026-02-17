import { Component, HostListener, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TvshowDetails } from 'src/app/core/interface/tvshow-details';
import myAppConfig from 'src/app/core/config/my-app-config';
import { TvshowsService } from 'src/app/core/services/tvshows.service';
import { forkJoin } from 'rxjs';

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
  background_video_type: any;
  isLoading: boolean = true;
  activeTab: string = 'seasons';
  tabConfig = [
    { id: 'seasons', label: 'Seasons', hasData: () => this.tvshowDetails.seasons?.length > 0 },
    { id: 'backdrops', label: 'Backdrops', hasData: () => this.tvshowDetails.backdropList?.length > 0 },
    { id: 'posters', label: 'Posters', hasData: () => this.tvshowDetails.posterList?.length > 0 },
    { id: 'videos', label: 'Videos', hasData: () => this.tvshowDetails.videoList?.length > 0 },
    { id: 'cast', label: 'Cast', hasData: () => this.tvshowDetails.castList?.length > 0 },
    { id: 'crew', label: 'Crew', hasData: () => this.tvshowDetails.crewList?.length > 0 },
    { id: 'recommended', label: 'Recommended', hasData: () => this.tvshowDetails.rectvshowList?.length > 0 },
    { id: 'similar', label: 'Similar', hasData: () => this.tvshowDetails.similartvshowList?.length > 0 },
    { id: 'reviews', label: 'Reviews', hasData: () => this.tvshowDetails.reviewList?.length > 0 },
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tvshowservice: TvshowsService,
    private _sanitizer: DomSanitizer
  ) {
    let id = this.route.snapshot.params['id'];
    tvshow_id = id;
    this.router.navigateByUrl('/tvshowdetails/' + tvshow_id);
    // Don't call getTvshowDetails here - will be called in ngOnInit
  }

  ngOnInit(): void {
    const id = this.route.snapshot?.params['id'];
    this.getTvshowDetails(id);
  }

  ngOnDestroy(): void {
    this.tvshowDetails = {} as TvshowDetails;
  }

  getTvshowDetails(tvshow_id: number) {
    this.isLoading = true;
    
    forkJoin([
      this.tvshowservice.gettvshowDetails(tvshow_id),
      this.tvshowservice.getAllImages(tvshow_id),
      this.tvshowservice.gettvshowReviews(tvshow_id),
      this.tvshowservice.gettvshowCredits(tvshow_id),
      this.tvshowservice.getSimilartvshows(tvshow_id),
      this.tvshowservice.getRecommendedtvshows(tvshow_id),
      this.tvshowservice.getVideos(tvshow_id),
      this.tvshowservice.getWatchProviders(tvshow_id),
    ]).subscribe({
      next: ([
        tvshowDetails,
        images,
        reviews,
        credits,
        similarTvShows,
        recommendedTvShows,
        videos,
        watchProviders,
      ]) => {
        if (tvshowDetails !== null) {
          this.setTvshowDetails(tvshowDetails);
          this.setWatchProvider(watchProviders, tvshowDetails.homepage);
        }

        if (
          images.backdrops?.length > 0 ||
          images.logos?.length > 0 ||
          images.posters?.length > 0
        ) {
            this.setImages(images);
        }

        if (reviews.results.length > 0) {
          this.setReviews(reviews);
        }

        if (credits?.cast?.length > 0 || credits?.crew?.length > 0) {
            this.setCreditDetails(credits);
        }

        if (similarTvShows.results.length > 0) {
          this.setSimilarTvshowDetails(similarTvShows);
        }

        if (recommendedTvShows.results.length > 0) {
          this.setRecommendedTvshowDetails(recommendedTvShows);
        }

        if (videos.results.length > 0) {
          this.setVideoDetails(videos);
        }
        this.ensureActiveTab();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('An error occurred while loading TV show data:', err);
        this.isLoading = false;
      }
    });
  }
  setTvshowDetails(tvshowDetails:any){
     //Default Tvshow Details
     this.tvshowDetails.backdrop_path = tvshowDetails.backdrop_path;
     this.tvshowDetails.episode_run_time =
     tvshowDetails.episode_run_time;
     this.tvshowDetails.avg_run_time =
       this.tvshowDetails.episode_run_time[0];
     for (let i = 0; i < this.tvshowDetails.episode_run_time.length; i++) {
       if (
         this.tvshowDetails.avg_run_time <
         this.tvshowDetails.episode_run_time[i]
       ) {
         this.tvshowDetails.avg_run_time =
           this.tvshowDetails.episode_run_time[i];
       }
     }
     this.tvshowDetails.first_air_date = tvshowDetails.first_air_date;
     this.tvshowDetails.genre = tvshowDetails.genres;
     this.tvshowDetails.homepage = tvshowDetails.homepage;
     this.tvshowDetails.id = tvshowDetails.id;
     this.tvshowDetails.original_lan = tvshowDetails.original_language;
     this.tvshowDetails.last_air_date = tvshowDetails.last_air_date;
     this.tvshowDetails.last_episode_to_air =
     tvshowDetails.last_episode_to_air;
     this.tvshowDetails.networks = tvshowDetails.networks;
     this.tvshowDetails.no_of_episodes =
     tvshowDetails.number_of_episodes;
     this.tvshowDetails.no_of_seasons =
     tvshowDetails.number_of_seasons;
     this.tvshowDetails.original_title = tvshowDetails.original_name;
     this.tvshowDetails.overview = tvshowDetails.overview;
     this.tvshowDetails.popularity = tvshowDetails.popularity;
     this.tvshowDetails.poster_path = tvshowDetails.poster_path;
     this.tvshowDetails.production_companies =
     tvshowDetails.production_companies;
     this.tvshowDetails.production_countries =
     tvshowDetails.production_countries;
     this.tvshowDetails.seasons = tvshowDetails.seasons;
     this.tvshowDetails.status = tvshowDetails.status;
     this.tvshowDetails.tagline = tvshowDetails.tagline;
     this.tvshowDetails.vote_average = tvshowDetails.vote_average;
     this.tvshowDetails.vote_count = tvshowDetails.vote_count;

     // To Remove other than seasons
     // for(let i=0;i<this.tvshowDetails.seasons.length;i++){
     //   if(this.tvshowDetails.seasons[i].season_number==0){
     //     this.tvshowDetails.seasons.splice(i, 1);
     //   }
     // }

  }
  setImages(images:any){
    if (images.backdrops.length == '0') {
      this.tvshowDetails.background_image = null;
    } else {
      this.tvshowDetails.backdropList = images.backdrops;

      this.tvshowDetails.background_image =
        this.highqualityImgUrl + images.backdrops[0].file_path;

      setInterval(() => {
        const random = Math.floor(
          Math.random() * images.backdrops.length
        );
        this.tvshowDetails.background_image =
          this.highqualityImgUrl + images.backdrops[random].file_path;
      }, 30000);
    }

    //Tvshow Posters Images

    this.tvshowDetails.posterList = images.posters;

    let englishLogos: any[] = [];
    if (images.logos.length > 0) {
      images?.logos.forEach((logo: any) => {
        if (logo.iso_639_1 == 'en') {
          englishLogos.push(logo);
        }
      });
    }

    if (englishLogos.length > 0) {
      this.tvshowDetails.logoList = englishLogos[0];
    }
  }

  setReviews(reviews:any){
    reviews.results.forEach((review: any) => {
      if (review.author_details.avatar_path) {
        if (
          review.author_details.avatar_path[0] == '/' &&
          review.author_details.avatar_path[1] == 'h' &&
          review.author_details.avatar_path[2] == 't' &&
          review.author_details.avatar_path[3] == 't' &&
          review.author_details.avatar_path[4] == 'p'
        ) {
          let avatar_path =
            review.author_details.avatar_path.substring(1);
          review.author_details.avatar_path = avatar_path;
        } else {
          let avatar_path =
            this.imgUrl + review.author_details.avatar_path;
          review.author_details.avatar_path = avatar_path;
        }
      }
    });
    this.tvshowDetails.reviewList = reviews.results;
  }
  setCreditDetails(credits:any){
    let castList = credits.cast;
    this.tvshowDetails.castList = castList;

    for (let i = 0; i < castList.length; i++) {
      this.tvshowDetails.castList[i].id = castList[i].id;
      this.tvshowDetails.castList[i].title = castList[i].name;
      this.tvshowDetails.castList[i].popularity = castList[i].popularity;
      this.tvshowDetails.castList[i].poster_path =
        castList[i].profile_path;
      this.tvshowDetails.castList[i].job =
        castList[i].known_for_department;
      this.tvshowDetails.castList[i].character = castList[i].character;
    }

    let c_data = this.filterCrewData(credits.crew);
    this.tvshowDetails.crewList = c_data;

    for (let i = 0; i < c_data.length; i++) {
      this.tvshowDetails.crewList[i].id = c_data[i].id;
      this.tvshowDetails.crewList[i].title = c_data[i].name;
      this.tvshowDetails.crewList[i].popularity = c_data[i].popularity;
      this.tvshowDetails.crewList[i].poster_path = c_data[i].profile_path;
      this.tvshowDetails.crewList[i].job = c_data[i].known_for_department;
    }
  }
  setVideoDetails(videos: any) {
    this.tvshowDetails.videoList = videos.results;
    this.tvshowDetails.videoList.forEach((video: any) => {
      video.videoThumbnail =
        myAppConfig.tmdb.thumbnailUrl + video.key + '/0.jpg';
    });
    var max: any = null;
    var min: any = null;
    for (let i = 0; i < this.tvshowDetails.videoList.length; i++) {
      if (this.tvshowDetails.videoList[i].key) {
        var current = this.tvshowDetails.videoList[i];
        if (max === null || current.published_at > max.published_at) {
          max = current;
        }
        if (min === null || current.published_at < min.published_at) {
          min = current;
        }
      } else {
        this.tvshowDetails.videoList[i].key = null;
        this.tvshowDetails.videoList[i].videoThumbnail = null;
      }
    }
    if (max !== null) {
      this.background_video = this._sanitizer.bypassSecurityTrustResourceUrl(
        myAppConfig.tmdb.videoUrl + max.key + '?autoplay=1&controls=0&rel=0'
      );
      this.background_video_type = max.type;
    }

    this.tvshowDetails.videoList.forEach((video: any) => {
      video.key = this._sanitizer.bypassSecurityTrustResourceUrl(
        myAppConfig.tmdb.videoUrl + video.key + '?autoplay=1'
      );
    });
  }

  setRecommendedTvshowDetails(recommendedTvShows: any) {
    for (let i = 0; i < recommendedTvShows.results.length; i++) {
      if (recommendedTvShows.results[i].poster_path == null) {
        recommendedTvShows.results[i].poster_path = 'Empty';
      }
    }
    this.tvshowDetails.rectvshowList = recommendedTvShows.results;
    let rec_tvshow = recommendedTvShows.results;
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
  }

  setSimilarTvshowDetails(similarTvShows:any){
    for (let i = 0; i < similarTvShows.results.length; i++) {
      if (similarTvShows.results[i].poster_path == null) {
        similarTvShows.results[i].poster_path = 'Empty';
      }
    }

    let s_tvshow = similarTvShows.results;
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
  }
  setWatchProvider(watchProviders: any, homepage: string) {
    const providerLink = this.extractWatchProviderLink(watchProviders);
    this.tvshowDetails.watchprovider = providerLink || homepage || null;
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
