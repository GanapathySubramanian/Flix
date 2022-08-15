import { Component, OnInit } from '@angular/core';
import { LoaderService } from './core/services/loader.service';

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
  }
}
