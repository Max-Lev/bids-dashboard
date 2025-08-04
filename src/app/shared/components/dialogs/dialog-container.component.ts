import { NgClass, NgComponentOutlet } from '@angular/common';
import { Component, inject, Type, Injector, HostListener, signal, effect, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog-tokens';

@Component({
  selector: 'dialog-container',
  imports: [FormsModule, ReactiveFormsModule, NgComponentOutlet,
    NgClass
  ],
  standalone: true,
  templateUrl: './dialog-container.component.html',
  styleUrl: './dialog-container.component.css',
})
export class DialogContainer implements OnDestroy {
  config = inject(DialogConfig);
  dialogRef = inject(DialogRef);

  component: Type<any> = this.config.component;
  injector: Injector;

  showBackDrop = signal<boolean>(true);

  constructor() {
    this.injector = Injector.create({
      providers: [
        { provide: DIALOG_DATA, useValue: this.config.data },
        { provide: DialogRef, useValue: this.dialogRef }
      ],
    });

    effect(() => {
      const _showBackDrop = (this.config.data.showBackDrop === undefined) ? true : false;
      this.showBackDrop.set(_showBackDrop);
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

  ngOnDestroy() {
    // Ensure scroll is re-enabled when modal is destroyed
    document.body.style.overflow = '';
  }

}
