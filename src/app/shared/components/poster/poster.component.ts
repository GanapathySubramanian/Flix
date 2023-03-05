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
  constructor() {}

  ngOnInit(): void {}
}
