import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import myAppConfig from 'src/app/core/config/my-app-config';

@Component({
  selector: 'app-video-header',
  templateUrl: './video-header.component.html',
  styleUrls: ['./video-header.component.css'],
})
export class VideoHeaderComponent implements OnInit {
  @Input() data: any = {};
  highQualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;
  imgUrl: string = myAppConfig.tmdb.imgUrl;
  @Input() background_video: any;
  @Input() background_video_type: any;
  @Input() isCarousel: boolean = false;
  playVideo: boolean = false;
  inWatchList: boolean = false;
  watchList: any[] = [];
  id: number = 0;
  scrHeight: number=0;
  scrWidth: number=0;
  mobiledevice: boolean=false;
  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot?.params['id'];
  }
  @ViewChild('myFrame') myFrame: any;
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;

    if (this.scrWidth <= 820) {
      this.mobiledevice = true;
    } else {
      this.mobiledevice = false;
    }
  }
  ngOnInit(): void {
    let result = localStorage.getItem('watchListData');
    if (result) {
      this.watchList = [];
      this.watchList = JSON.parse(result);
    }
    if (this.watchList.some((movie) => movie.id == this.id)) {
      this.inWatchList = true;
    }
    if (this.data?.id) {
      if (this.watchList.some((movie) => movie.id == this.data.id)) {
        this.inWatchList = true;
      }
    }
    // if(!this.isCarousel && !this.mobiledevice){
    //   setTimeout(
    //   () =>{  this.playVideo = true;
    //     this.myFrame?.nativeElement.contentWindow.postMessage(
    //       '{"event":"command","func":"playVideo","args":""}',
    //       '*'
    //     );
    //     console.log('playVideo');
    //    },
    //    5000
    //   );   
    // }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 800 && !this.mobiledevice) {
      this.stopTrailer()
    }
  }
  playTrailer() {
    this.playVideo = true;
    this.myFrame?.nativeElement.contentWindow.postMessage(
      '{"event":"command","func":"playVideo","args":""}',
      '*'
    );
  }
  stopTrailer() {
    this.playVideo = false;
    this.myFrame?.nativeElement.contentWindow.postMessage(
      '{"event":"command","func":"pauseVideo","args":""}',
      '*'
    );
  }
  addTowatchList(result: any) {
    let movieTvShowDetail = {
      backdrop_path: result.backdrop_path,
      id: result.id,
      title: result.original_title
        ? result.original_title
        : result.title
        ? result.title
        : result.name
        ? result.name
        : null,
      overview: result.overview,
      poster_path: result.poster_path,
      runtime: result.runtime
        ? result.runtime
        : result.avg_run_time
        ? result.avg_run_time
        : null,
      release_date: result.release_date
        ? result.release_date
        : result.first_air_date
        ? result.first_air_date
        : null,
      status: result.status,
      vote_average: result.vote_average,
      watchprovider: result.watchprovider,
      background_image: result.background_image,
      detailsAbout:
        result.no_of_seasons || result.avg_run_time || result.first_air_date
          ? 'tvshow'
          : result.parts
          ? 'collection'
          : 'movie',
    };
    if (
      !this.watchList.some((details) => details.id === movieTvShowDetail.id)
    ) {
      this.watchList.push(movieTvShowDetail);
    }
    localStorage.setItem('watchListData', JSON.stringify(this.watchList));
    this.inWatchList = true;
  }
  removeFromWatchList(result: any) {
    if (this.watchList.some((details) => details.id === result.id)) {
      this.watchList.forEach((watchData, index) => {
        if (watchData.id === result.id) {
          this.watchList.splice(index, 1);
        }
      });
    }
    localStorage.setItem('watchListData', JSON.stringify(this.watchList));
    this.inWatchList = false;
  }
}
