import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
  @Input() isCarousel: boolean = false;
  playVideo: boolean = false;
  constructor() {}
  @ViewChild('myFrame') myFrame: any;

  ngOnInit(): void {}
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
}
