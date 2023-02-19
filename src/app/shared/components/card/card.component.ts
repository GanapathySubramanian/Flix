import { Component, Input, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';
import { common } from 'src/app/core/interface/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() data!: any;
  imgUrl: string = myAppConfig.tmdb.imgUrl;
  @Input() isCollections: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  float2int(value: any) {
    return value | 0;
  }
}
