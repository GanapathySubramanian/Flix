import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-dark-toggle',
  templateUrl: './dark-toggle.component.html',
  styleUrls: ['./dark-toggle.component.css']
})
export class DarkToggleComponent implements OnInit {
  isThemeDark: Observable<boolean> | undefined;

  @Input() cmp:string='';

  constructor(
    private themeService: ThemeService
  ) {
  }

  ngOnInit() {
    this.isThemeDark = this.themeService.isThemeDark;
    
  }
  
 


  toggleDarkTheme1(event:any) {

    const checkbox = document.getElementById(
      'checkbox1',
    ) as HTMLInputElement | null;
    
    if (checkbox?.checked) {
      this.themeService.setDarkTheme(true);

    } else {
      this.themeService.setDarkTheme(false);
    }
  
  }

  toggleDarkTheme2(event:any) {

    const checkbox = document.getElementById(
      'checkbox2',
    ) as HTMLInputElement | null;
    
    if (checkbox?.checked) {
      this.themeService.setDarkTheme(true);

    } else {
      this.themeService.setDarkTheme(false);
    }
  }
  

}
