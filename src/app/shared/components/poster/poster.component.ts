import { Component, Input, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.css'],
})
export class PosterComponent implements OnInit {
  imgUrl: string = myAppConfig.tmdb.highQualityImgUrl;
  @Input() data: any;
  selectedImage: any;
  openPopUp: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  openModal(poster: any) {
    this.openPopUp = true;
    this.selectedImage = poster;
  }

  resetData(event: boolean) {
    this.selectedImage = {};
    this.openPopUp = !event;
  }
}
