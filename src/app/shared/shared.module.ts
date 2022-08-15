import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { ReviewComponent } from './components/review/review.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { VideoComponent } from './components/video/video.component';
import { PosterComponent } from './components/poster/poster.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { LoaderComponent } from './components/loader/loader.component';
import { DarkToggleComponent } from './components/dark-toggle/dark-toggle.component';



@NgModule({
  declarations: [
    CardComponent,
    HeaderComponent,
    ReviewComponent,
    BackdropComponent,
    VideoComponent,
    PosterComponent,
    LoaderComponent,
    DarkToggleComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    IvyCarouselModule
  ],
  exports:[
    CardComponent,
    HeaderComponent,
    ReviewComponent,
    BackdropComponent,
    VideoComponent,
    PosterComponent,
    LoaderComponent,
    DarkToggleComponent
  ]
})
export class SharedModule { }
