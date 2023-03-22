import { Component, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';
import { common } from 'src/app/core/interface/common';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.css'],
})
export class WatchListComponent implements OnInit {
  movieList: any[] = [];
  highQualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;

  constructor() {}

  ngOnInit(): void {
    let data = localStorage.getItem('watchListData');
    if (data) {
      this.movieList = JSON.parse(data);
    }
  }
}
