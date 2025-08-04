import { Component, computed, effect, inject, signal } from '@angular/core';
import { DialogRef } from '../dialog-ref';
import { DIALOG_DATA } from '../dialog-tokens';
import { ButtonComponent } from '../../button/button.component';
import { SettingsService } from 'src/app/shared/providers/settings.service';
import { toSignal } from '@angular/core/rxjs-interop';

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
  settingsService = inject(SettingsService)
  private _discount = toSignal(this.settingsService.getDiscount())
  readonly discount = computed(() => this._discount());
  constructor() {
    // console.log(this.dialogRef,this.dialogData)
    // Optional side effect (e.g., to log or trigger a service)
    effect(() => {
      console.log(`Discount changed to ${this.discount()}%`);
      // this.dialogRef.close({volum:this.volume()});
      this.dialogRef.emitChange({ volume: this.discount() });
    });



  }

  onClose() {
    this.dialogRef.close();
  }

  onSave(){
    this.dialogRef.close({ volum: this.discount() });
  }


  onDiscountChange(event: Event) {
    const value = (event.target as HTMLInputElement).valueAsNumber;
    this.settingsService.setDiscount(value);


  }

}
