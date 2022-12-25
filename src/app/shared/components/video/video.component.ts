import { Component, Input, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  @Input() data:any;
  imgUrl:string=myAppConfig.tmdb.imgUrl;
  constructor() { }

  ngOnInit(): void {
    console.log(this.data);
    
  }

}
