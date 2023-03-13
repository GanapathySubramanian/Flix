import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';

@Component({
  selector: 'app-pop-up-modal',
  templateUrl: './pop-up-modal.component.html',
  styleUrls: ['./pop-up-modal.component.css'],
})
export class PopUpModalComponent implements OnInit {
  @Input() openModal: boolean = false;
  @Input() isImage: boolean = false;
  @Input() isVideo: boolean = false;
  @Input() data: any;
  @Output() resetData = new EventEmitter<boolean>(false);
  highqualityImgUrl: string = myAppConfig.tmdb.highQualityImgUrl;

  constructor() {}

  ngOnInit(): void {  }
  closeModal() {
    this.openModal = false;
    this.resetData.emit(true);
  }
}
