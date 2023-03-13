import { Component, Input, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  @Input() data:any;
  imgUrl: string = myAppConfig.tmdb.highQualityImgUrl;
  bgColor:any='';
  constructor() { 
    let x = Math.floor(Math.random() * 256);
    let y = Math.floor(Math.random() * 256);
    let z = Math.floor(Math.random() * 256);
    this.bgColor="rgb(" + x + "," + y + "," + z + ")";
  }

  ngOnInit(): void {}
 
}
