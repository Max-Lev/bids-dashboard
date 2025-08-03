import { Component, effect, inject, signal } from '@angular/core';
import { DialogRef } from '../dialog-ref';
import { DIALOG_DATA } from '../dialog-tokens';
import { ButtonComponent } from '../../button/button.component';

@Component({
  selector: 'app-settings-dialog',
  imports: [
    ButtonComponent
  ],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.css'
})
export class SettingsDialogComponent {
private dialogRef = inject(DialogRef);
  public dialogData = inject(DIALOG_DATA);
  readonly volume = signal(50);
  constructor(){
    // console.log(this.dialogRef,this.dialogData)
    // Optional side effect (e.g., to log or trigger a service)
    effect(() => {
      // console.log(`Volume changed to ${this.volume()}%`);
      // this.dialogRef.close({volum:this.volume()});
      this.dialogRef.emitChange({ volume: this.volume(),volume2: this.volume() });
    });

    

  }
  
  onClose() {
    this.dialogRef.close({volum:this.volume()});
  }

  
  onVolumeChange(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.volume.set(value);
  }

}
