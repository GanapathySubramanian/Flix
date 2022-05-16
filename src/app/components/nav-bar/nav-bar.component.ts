import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  windowScrolled: boolean=false;

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
 
     //or document.body.scrollTop = 0;
     //or document.querySelector('body').scrollTo(0,0)

 }


 @HostListener('window:scroll',[])
 onWindowScroll() {
     if (window.scrollY> 1000) {        
         this.windowScrolled = true;
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
