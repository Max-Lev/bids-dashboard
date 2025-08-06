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
  // Define signals for discount and stock
  // Using toSignal to convert observables to signals
  private _discount = toSignal(this.settingsService.getDiscount())
  readonly discount = computed(() => this._discount());
  
  // Using toSignal to convert observables to signals
  // Using signal for stock, as it is a BehaviorSubject
  private _stock = toSignal(this.settingsService.stock$)
  readonly stock = computed(() => this._stock());

  // isSettingsActive = computed(() => this.settingsService.isSettingsActive.value);


  constructor() {
    
    effect(() => {
      console.log(`Discount changed to ${this.discount()}%`);
      console.log(`Stock changed to ${this.stock()}`);
      
      // this.dialogRef.emitChange({ volume: this.discount() });
    });
    
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave(){
    this.dialogRef.close({ discount: this.discount(),stock: this.stock() });
  }


  onDiscountChange(event: Event) {
    const value = this.getRangeValue(event)
    this.settingsService.setDiscount(value);
    
  }
  onStockChange(event: Event) {
    const value = this.getRangeValue(event)
    this.settingsService.setStock(value);
    
  }

  activeControl:{[key:string]:boolean}[] = [];
  private getRangeValue(event: Event){
    const {id} = (event.target as HTMLInputElement);
    this.activeControl.push({ [id]: true });
    this.settingsService.isSettingsActive.next(this.activeControl);
    this.settingsService.isActive.next(true);

    return (event.target as HTMLInputElement).valueAsNumber;
  }

}
