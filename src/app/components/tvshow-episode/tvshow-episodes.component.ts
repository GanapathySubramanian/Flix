import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import myAppConfig from 'src/app/core/config/my-app-config';
import { TvshowsService } from 'src/app/core/services/tvshows.service';

var tvshow_id = 0,
  season_id = 0,
  tv_name = '';
@Component({
  selector: 'app-tvshow-episodes',
  templateUrl: './tvshow-episodes.component.html',
  styleUrls: ['./tvshow-episodes.component.css'],
})
export class TvshowEpisodesComponent implements OnInit {
  imgUrl: any = myAppConfig.tmdb.highQualityImgUrl;

  episodes: any = [];
  tvshow_name: String = '';
  season_no: number = 0;
  logos: any = [];
  tvshow_season_details: any = {} as any;
  noLogos: boolean = false;
  episode_id = 0;
  stills: any;
  constructor(
    private route: ActivatedRoute,
    private tvshowservice: TvshowsService,
    private _sanitizer: DomSanitizer
  ) {
    let id = this.route.snapshot.params['tvshowid'];
    let sea_id = this.route.snapshot.params['season'];
    let epi_id = this.route.snapshot.params['episode'];
    let show_name = this.route.snapshot.params['tvshow_name'];
    tvshow_id = id;
    season_id = sea_id;
    tv_name = show_name;
    this.episode_id = epi_id;
    this.tvshow_name = tv_name;
    this.season_no = season_id;
  }

  ngOnInit(): void {
    this.getSeasonVideos();

    this.getEpisodes();
  }
  getSeasonVideos() {
    let api_url =
      myAppConfig.tmdb.tvshowDetailsBaseUrl +
      tvshow_id +
      '/season/' +
      season_id +
      '/episode/' +
      this.episode_id +
      '/videos?' +
      myAppConfig.tmdb.apikey;
    this.getEpisodeVideoData(api_url);
  }
  getEpisodeVideoData(api_url: string) {
    this.tvshow_season_details.original_title =
      this.tvshow_name + ' Episode ' + this.episodes;
    let epi: any;
    this.tvshowservice.getEpisodeVideos(api_url).subscribe((data) => {
      epi = data;
      this.tvshow_season_details.videoList = [];
      this.tvshow_season_details.videoList = epi.results;

      if (this.tvshow_season_details.videoList.length > 0) {
        this.tvshow_season_details.videoList.forEach((video: any) => {
          video.videoThumbnail =
            myAppConfig.tmdb.thumbnailUrl + video.key + '/0.jpg';
        });
      }
      for (let i = 0; i < this.tvshow_season_details.videoList.length; i++) {
        if (this.tvshow_season_details.videoList[i].key) {
          this.tvshow_season_details.videoList[i].key =
            this._sanitizer.bypassSecurityTrustResourceUrl(
              myAppConfig.tmdb.videoUrl +
                this.tvshow_season_details.videoList[i].key
            );
        } else {
          this.tvshow_season_details.videoList[i].key = null;
          this.tvshow_season_details.videoList[i].videoThumbnail = null;
        }
      }
    });
  }

  getEpisodes() {
    let api_url =
      myAppConfig.tmdb.tvshowDetailsBaseUrl +
      tvshow_id +
      '/season/' +
      season_id +
      '/episode/' +
      this.episode_id +
      '?' +
      myAppConfig.tmdb.apikey;
    this.getEpisodesData(api_url);

    this.getAllimages(tvshow_id, season_id, this.episode_id);
  }
  getAllimages(tvshow_id: number, season_id: number, episode_id: number) {
    let tempimagesData: any;
    this.tvshowservice
      .getAllImagesForEpisodes(tvshow_id, season_id, episode_id)
      .subscribe((data: any) => {
        tempimagesData = data;

        //Tvshow Logo Images
        // if (tempimagesData?.logos.length <= 0) {
        //   this.noLogos = true;
        // } else {
        //   this.noLogos = false;
        //   this.logos = tempimagesData?.logos[0];
        // }
        this.stills = tempimagesData.stills;
      });
  }
  getEpisodesData(api_url: string) {
    let epi: any;
    this.tvshowservice.getEpisodes(api_url).subscribe((data) => {
      epi = data;
      this.episodes = epi;
    });
  }

  float2int(value: any) {
    return value | 0;
  }
}
