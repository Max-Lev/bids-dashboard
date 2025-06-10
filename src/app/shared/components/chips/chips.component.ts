import { TitleCasePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-chips',
  imports: [
    TitleCasePipe,
    AngularSvgIconModule
  ],
  templateUrl: './chips.component.html',
  styleUrl: './chips.component.css'
})
export class ChipsComponent {
  list = input<string[]>([]);

  onChipsSelected = output<string>();

}
