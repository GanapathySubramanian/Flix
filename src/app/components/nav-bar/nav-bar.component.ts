import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  windowScrolled: boolean=false;
  // footer: boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  onActivate(event:any) {
    // window.scroll(0,0);
 
    window.scroll({ 
            top: 0, 
            left: 0, 
            behavior: 'smooth' 
     });
 }


 @HostListener('window:scroll',[])
 onWindowScroll() {
     if (window.scrollY> 1000) {        
         this.windowScrolled = true;
        //  this.footer=true;
     } 
    else if (this.windowScrolled && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
         this.windowScrolled = false;
     }
 }

   scrollToTop(){
     window.scroll({ 
           top: 0, 
           left: 0, 
           behavior: 'smooth' 
     });
 }

}
