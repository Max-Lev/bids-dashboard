import { NgClass } from '@angular/common';
import { Component, EventEmitter, input, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-save-delete-button',
  imports: [NgClass],
  templateUrl: './save-delete-button.component.html',
  styleUrl: './save-delete-button.component.css'
})
export class SaveDeleteButtonComponent {

  disabled = input<boolean>(false);
  @Input() classes: string = '';
  @Output() buttonClick = new EventEmitter<void>();

  onButtonClick(){
    this.buttonClick.emit();
  }

}
