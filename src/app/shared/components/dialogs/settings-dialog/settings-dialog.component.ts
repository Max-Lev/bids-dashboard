import { AfterViewInit, Component, computed, DestroyRef, effect, inject, OnDestroy, signal } from '@angular/core';
import { DialogRef } from '../dialog-ref';
import { DIALOG_DATA } from '../dialog-tokens';
import { ButtonComponent } from '../../button/button.component';
import { SettingsService } from 'src/app/shared/providers/settings.service';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-dialog',
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './settings-dialog.component.html',
  styleUrl: './settings-dialog.component.css',
})
export class SettingsDialogComponent implements AfterViewInit, OnDestroy {
  private dialogRef = inject(DialogRef);
  public dialogData = inject(DIALOG_DATA);
  settingsService = inject(SettingsService);
  destroyRef = inject(DestroyRef)

  discount = computed(()=>this.settingsService.formState().discount.value);
  stock = computed(()=>this.settingsService.formState().stock.value);
  

  settingsForm = new FormGroup({
    discount: new FormControl<number>(this.discount() ?? 0),
    stock: new FormControl<number>(this.stock() ?? 0),
  });

  constructor() {
    effect(() => {
      
      // this.dialogRef.emitChange({ volume: this.discount() });
    });
  }
  ngOnDestroy(): void {
    
  }
  ngAfterViewInit(): void {
    
    for (const key in this.settingsForm.controls) {
      if (this.settingsForm.get(key) && this.settingsForm.get(key)?.value !== 0) {
        this.settingsForm.get(key)?.markAsDirty();
      }
    }

    this.settingsForm.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
 
      const discountControl = this.settingsForm.get('discount');
      const stockControl = this.settingsForm.get('stock');

      // reset color
      for (const key in this.settingsForm.controls) {
        if (this.settingsForm.get(key) && this.settingsForm.get(key)?.value === 0) {
          this.settingsForm.get(key)?.markAsPristine();
        }
      }
      this.settingsService.setFormState({
        discount: {
          value: value.discount ?? -1,
          isActive: discountControl?.dirty ?? false,
        },
        stock: {
          value: value.stock ?? -1,
          isActive: stockControl?.dirty ?? false,
        },
      });
      
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onSave() {
    this.dialogRef.close({ discount: this.discount(), stock: this.stock() });
  }

  onDiscountChange(event: Event) {
    const value = this.getRangeValue(event);
    // this.settingsService.setDiscount(value);
  }
  onStockChange(event: Event) {
    const value = this.getRangeValue(event);
    // this.settingsService.setStock(value);
  }

  private getRangeValue(event: Event) {
    return (event.target as HTMLInputElement).valueAsNumber;
  }
}
