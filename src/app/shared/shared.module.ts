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
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { VideoHeaderComponent } from './components/video-header/video-header.component';
import { TrendingBackdropsComponent } from './components/trending-backdrops/trending-backdrops.component';
import { RouterModule } from '@angular/router';
import { PopUpModalComponent } from './components/pop-up-modal/pop-up-modal.component';

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
    LandingPageComponent,
    VideoHeaderComponent,
    TrendingBackdropsComponent,
    PopUpModalComponent,
  ],
  imports: [CommonModule, NgbModule, IvyCarouselModule, RouterModule],
  exports: [
    CardComponent,
    HeaderComponent,
    ReviewComponent,
    BackdropComponent,
    VideoComponent,
    PosterComponent,
    LoaderComponent,
    DarkToggleComponent,
    LandingPageComponent,
    VideoHeaderComponent,
    TrendingBackdropsComponent,
  ],
})
export class SharedModule {}
