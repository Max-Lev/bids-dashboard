import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSonnerToaster } from 'ngx-sonner';
import { ThemeService } from './core/services/theme.service';
import { ResponsiveHelperComponent } from './shared/components/responsive-helper/responsive-helper.component';
import { FirebaseService } from './core/firebase/firebase.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, 
    // ResponsiveHelperComponent, 
    NgxSonnerToaster],
})
export class AppComponent {
  

  constructor(public themeService: ThemeService,private firebase: FirebaseService) {
    this.firebase.getAnalyticsInstance();
  }
}
