import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, TemplateRef } from '@angular/core';
import { DialogService } from 'src/app/core/services/dialog.service';
import { ProductsDialogComponent } from '../dialogs/products-dialog/products-dialog.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, mergeMap } from 'rxjs';
import { IProductFormData } from 'src/app/core/models/dialog.models';
import { Product } from 'src/app/core/models/products';
import { SettingsDialogComponent } from '../dialogs/settings-dialog/settings-dialog.component';

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
          click: settingsHandler.bind(this)
        }
      ">
    </ng-container>
  `,
  // settingsBtnState: settingsBtnState(),
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsInjectionProviderComponent {

  dialogService = inject(DialogService)

  @Input({ required: true }) template!: TemplateRef<any>;

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
          stock:1
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
  
      dialogRef.afterClosed$
        // .pipe(
        //   // takeUntilDestroyed(this.destroy$),
        //   filter((productForm: IProductFormData) => {
        //     console.log('productForm: ', productForm);
        //     return !!productForm;
        //   }),
        //   // mergeMap((result) => this.productsService.updateProductById(product, result))
        // )
        .subscribe({
          next: (response) => {
            console.log('response: ', response);
            // this.product.update((state) => ({ ...state, product: { ...state.product, ...response } }));
          },
          error: (err) => {
            console.log(err);
          },
        });

        dialogRef.onChange$.subscribe((val) => {
          console.log('Live volume:', val);
          // Update parent component or perform real-time actions
        });
    }


}
