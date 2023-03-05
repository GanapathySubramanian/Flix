import { Component, Input, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.css'],
})
export class BackdropComponent implements OnInit {
  @Input() data: any;
  imgUrl: string = myAppConfig.tmdb.imgUrl;
  selectedImage: any;
  openPopUp: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  openModal(back_path: any) {
    this.openPopUp = true;
    this.selectedImage = back_path;
  }
  resetData(event: boolean) {
    this.selectedImage = {};
    this.openPopUp = !event;
  }
}
