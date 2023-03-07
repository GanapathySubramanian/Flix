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
    Aos.init();//AOS - 2
    Aos.refresh();
    Aos.refreshHard();
  }
}
