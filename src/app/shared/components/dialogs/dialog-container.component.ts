import { NgComponentOutlet } from '@angular/common';
import { Component, inject, Type, Injector, HostListener} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog-tokens';

@Component({
  selector: 'dialog-container',
  imports: [FormsModule, ReactiveFormsModule, NgComponentOutlet],
  standalone: true,
  templateUrl: './dialog-container.component.html',
  styleUrl: './dialog-container.component.css',
})
export class DialogContainer {
  config = inject(DialogConfig);
  dialogRef = inject(DialogRef);

  component: Type<any> = this.config.component;
  injector: Injector;


  constructor() {
    this.injector = Injector.create({
      providers: [
        { provide: DIALOG_DATA, useValue: this.config.data },
        { provide: DialogRef, useValue: this.dialogRef }
      ],
    });
    
  }

  close() {
    this.dialogRef.close();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.close();
  }

  onBackdropClick() {
    if (this.config.closeOnBackdropClick) {
      this.close();
    }
  }
  
}
