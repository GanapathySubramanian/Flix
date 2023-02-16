import { Component, Input, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';

@Component({
  selector: 'app-trending-backdrops',
  templateUrl: './trending-backdrops.component.html',
  styleUrls: ['./trending-backdrops.component.css'],
})
export class TrendingBackdropsComponent implements OnInit {
  highQualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;

  @Input() title: string = '';
  @Input() trendingList: any[] = [];
  constructor() {}

  ngOnInit(): void {}
}
