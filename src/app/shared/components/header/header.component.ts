import { Component, Input, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';
import { MovieDetails } from 'src/app/core/interface/movie-details';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() data:any={};
  imgUrl:string=myAppConfig.tmdb.highQualityImgUrl;
  background_video:any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
