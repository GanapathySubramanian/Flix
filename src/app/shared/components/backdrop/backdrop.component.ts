import { Component, Input, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.css']
})
export class BackdropComponent implements OnInit {

  @Input() data:any;
  highqualityImgUrl:string=myAppConfig.tmdb.highQualityImgUrl;

  constructor() { }

  ngOnInit(): void {
  }

}
