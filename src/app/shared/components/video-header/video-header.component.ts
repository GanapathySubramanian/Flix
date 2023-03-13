import { Component, Input, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';

@Component({
  selector: 'app-video-header',
  templateUrl: './video-header.component.html',
  styleUrls: ['./video-header.component.css'],
})
export class VideoHeaderComponent implements OnInit {
  @Input() data: any = {};
  imgUrl: string = myAppConfig.tmdb.highQualityImgUrl;
  @Input() background_video: any;
  @Input() isCarousel:boolean=false;
  playVideo: boolean = false;
  constructor() {}

  ngOnInit(): void {   
    console.log(this.data);
     this.data.vote_average=(this.data.vote_average*50)/100;
  }
  playTrailer() {
    this.playVideo = true;
  }
  stopTrailer() {
    this.playVideo = false;
  }
}
