import { Component, OnInit } from '@angular/core';
import myAppConfig from 'src/app/core/config/my-app-config';
import { LandingService } from 'src/app/core/services/landing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  postersList:any;
imgUrl:string=myAppConfig.tmdb.imgUrl;
  
  constructor(private landingService:LandingService) {
    this.landingService.getTopMoviesPosters()
      this.landingService.getTopTvshowPosters()

   

    this.landingService.posterData.subscribe(data=>{
      this.postersList=data;
      console.log(data);
      
      console.log(this.postersList);
    })
   }

  ngOnInit(): void {
  }

}
