import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ThemeService } from 'src/app/core/services/theme.service';

@Component({
  selector: 'app-dark-toggle',
  templateUrl: './dark-toggle.component.html',
  styleUrls: ['./dark-toggle.component.css']
})
export class DarkToggleComponent implements OnInit {
  isThemeDark: Observable<boolean> | undefined;

  @Input() device!:boolean;

  constructor(
    private themeService: ThemeService
  ) {

    
  }

  ngOnInit() {
    this.isThemeDark = this.themeService.isThemeDark;
    
  }

  toggleDarkTheme(event:any) {

    const checkbox = document.getElementById(
      'checkbox',
    ) as HTMLInputElement | null;
    
    if (checkbox?.checked) {
      console.log('Checkbox is checked');
      this.themeService.setDarkTheme(true);

    } else {
      console.log('Checkbox is NOT checked');
      this.themeService.setDarkTheme(false);
    }
    

  }

}
