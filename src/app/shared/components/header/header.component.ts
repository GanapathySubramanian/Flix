import { Component, Input, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';
import { MovieDetails } from 'src/app/core/interface/movie-details';
import { MoviesService } from 'src/app/core/services/movies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @Input() data: any = {};
  imgUrl: string = myAppConfig.tmdb.highQualityImgUrl;
  background_video: any;
  constructor(private movieservice: MoviesService) {}

  ngOnInit(): void {
    console.log(this.data);
  }

  float2int(value: any) {
    return value | 0;
  }
}
