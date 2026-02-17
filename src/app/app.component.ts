import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Flix';

  loader: boolean = false;
  constructor(private loaderService:LoaderService){

  }
  ngOnInit() {
    this.loaderService.loaderStatus.subscribe((status) => {
      this.loader = status;
    });
    // Initialize AOS with performance-optimized settings
    Aos.init({
      duration: 600, // Reduced from default 1000ms
      once: true, // Animation happens only once (huge performance boost)
      offset: 50, // Start animation 50px before element is in view
      delay: 0, // No delay
      easing: 'ease-in-out',
      disable: function() {
        // Disable animations on mobile devices for better performance
        return window.innerWidth < 768;
      }
    });
  }
}
