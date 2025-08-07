import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, Input, signal, TemplateRef } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SettingsDialogComponent } from '../dialogs/settings-dialog/settings-dialog.component';
import { SettingsService } from '../../providers/settings.service';

@Component({
  selector: 'app-settings-injection-provider',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  template: `
    <ng-container
      *ngTemplateOutlet="
        template;
        context: {
          click: settingsHandler.bind(this),
          isActive: isActive(),
        }
      ">
    </ng-container>
  `,
  // settingsBtnState: settingsBtnState(),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsInjectionProviderComponent {

  dialogService = inject(DialogService)

  settingsService = inject(SettingsService);

  @Input({ required: true }) template!: TemplateRef<any>;

  isActive = computed(() => {
    const formState = this.settingsService.formState();
    return formState.discount.isActive || formState.stock.isActive;
  });

  constructor(){
    effect(()=>{

    })
  }

  settingsBtnState(){
    console.log('settingsBtnState handler');
    return true;
  }

  settingsHandler(){
    console.log('settingsHandler handler');
    this.openProductDialog();
  }

    openProductDialog(): void {
      const dialogRef = this.dialogService.open(SettingsDialogComponent, {
        title: 'Settings',
        data: {
          showBackDrop:false,
        //   product,
        //   categories: this.productsService.categories(),
        //   availabilityStatus: this.productsService.availabilityStatusOptions(),
        //   shippingOptions: this.productsService.shippingOptions(),
        //   returnPolicyOptions: this.productsService.returnPolicyOptions(),
        //   warrantyOptions: this.productsService.warrantyOptions(),
        //   brandOptions: this.productsService.brandOptions(),
        } 
        // as ProductDialogDataType, // Pass the data here
      });
  
      dialogRef.afterClosed$.subscribe({
          next: (response) => {
            console.log('response: ', response);
            // this.product.update((state) => ({ ...state, product: { ...state.product, ...response } }));
          },
          error: (err) => {
            console.log(err);
          },
        });

        dialogRef.onChange$.subscribe((val) => {
          console.log('onChange:', val);
          // Update parent component or perform real-time actions
        });

        

      

    }


}
