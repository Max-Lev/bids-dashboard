import { Component, input, output, Output } from '@angular/core';
import { SavedFilter } from 'src/app/core/models/saved-filter.model';

@Component({
  selector: 'app-saved-filter-btns',
  imports: [],
  templateUrl: './saved-filter-btns.component.html',
  styleUrl: './saved-filter-btns.component.css'
})
export class SavedFilterBtnsComponent {
  savedFilterState = input<SavedFilter[]>();

  onFilterClick = output<number>();
}
