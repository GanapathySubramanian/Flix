import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  windowScrolled: boolean = false;
  // footer: boolean=false;
  mobiledevice: boolean = false;
  component: string = 'navbar';
  windoscrolling: boolean = false;
  lapdevice: boolean = false;
  splashScreen: boolean=true;
  constructor() {
    this.getScreenSize();
    let scrollPrecentage = () => {
      let scrollProgress: any = document.getElementById('progress');
      let progressValue = document.getElementById('progress-value');
      let pos = document.documentElement.scrollTop;
      let calcHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      let scrollValue = Math.round((pos * 100) / calcHeight);
      scrollProgress.style.background = `conic-gradient(#e70634 ${scrollValue}%, #2b2f38 ${scrollValue}%)`;
    };
    window.onscroll = scrollPrecentage;
    window.onload = scrollPrecentage;

    
  }

  
  ngOnInit(): void {
    setTimeout(() => {
      this.splashScreen=false;
    }, 3000);
  }

  onActivate(event: any) {
    // window.scroll(0,0);

    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 10) {
      this.windoscrolling = true;
    }
    if (window.scrollY > 1000) {
      this.windowScrolled = true;
      //  this.footer=true;
    } else if (
      (this.windowScrolled && window.pageYOffset) ||
      document.documentElement.scrollTop ||
      document.body.scrollTop < 10
    ) {
      this.windowScrolled = false;
    }
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }

  scrHeight: any;
  scrWidth: any;

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    if (this.scrWidth >= 900) {
      this.lapdevice = true;
    } else {
      this.lapdevice = false;
    }
    if (this.scrWidth <= 820) {
      this.mobiledevice = true;
    } else {
      this.mobiledevice = false;
    }
  }
}
