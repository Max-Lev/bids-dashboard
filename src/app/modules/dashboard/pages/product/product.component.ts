import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { concatMap, filter, mergeMap } from 'rxjs';
import { Product } from 'src/app/core/models/products';
import { DialogService } from 'src/app/core/services/dialog.service';
import { DialogData, IProductFormData, ProductDialogDataType } from 'src/app/core/models/dialog.models';
import { ProductsDialogComponent } from 'src/app/shared/components/dialogs/products-dialog/products-dialog.component';
import { NftDualCardComponent } from '../../components/nft/nft-dual-card/nft-dual-card.component';
import { ProductSingleCardComponent } from '../../components/nft/product-single-card/product-single-card.component';
import { ProductsService } from 'src/app/core/services/products.service';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnChanges,
  Input,
  inject,
  DestroyRef,
  signal,
  effect,
  SimpleChanges,
} from '@angular/core';
import { UsersService } from 'src/app/core/services/users.service';
import { StrictUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-product',
  imports: [
    NftDualCardComponent,
    // NftSingleCardComponent,
    ProductSingleCardComponent,
  ],
  providers: [],
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit, OnChanges {
  @Input() id: string = '';

  activatedRoute = inject(ActivatedRoute);
  destroy$ = inject(DestroyRef);

  // product = signal<Product>(this.activatedRoute.snapshot.data['productResolver'] as Product);
  product = signal<{ product: Product; users: (StrictUser | undefined)[] }>(this.activatedRoute.snapshot.data['productResolver']);
  //product: Product; users: (StrictUser | undefined)[]
  currentDialog = { isOpen: false, data: null as DialogData | null };

  productsService = inject(ProductsService);
  usersService = inject(UsersService);

  constructor(private dialogService: DialogService) {
    // this.dialogService.dialogState$.pipe(takeUntilDestroyed(this.destroy$)).subscribe((state) => {
    //   console.log('state: ', state);
    //   this.currentDialog = state;
    // });
    console.log(this.activatedRoute.snapshot.data['productResolver'])

    effect(() => {
      console.log(this.product());
    });
  }

  ngOnInit(): void {
    // this.product.update(prev=> ({...prev, ...{id:1}}));

    // this.usersService.getUsersByName(this.product());
    // const _prod = this.productsService.products().find((product) => product.id === +this.id);
    // this.openProductDialog(_prod ?? this.product());
  }

  ngOnChanges(changes: SimpleChanges): void {

  }

  openProductDialog(product: Product): void {
    const dialogRef = this.dialogService.open(ProductsDialogComponent, {
      title: 'Edit Product',
      data: {
        product,
        categories: this.productsService.categories(),
        availabilityStatus: this.productsService.availabilityStatusOptions(),
        shippingOptions: this.productsService.shippingOptions(),
        returnPolicyOptions: this.productsService.returnPolicyOptions(),
        warrantyOptions: this.productsService.warrantyOptions(),
        brandOptions: this.productsService.brandOptions(),
      } as ProductDialogDataType, // Pass the data here
    });

    dialogRef.afterClosed$
      .pipe(
        takeUntilDestroyed(this.destroy$),
        filter((productForm: IProductFormData) => {
          console.log('productForm: ', productForm);
          return !!productForm;
        }),
        mergeMap((result) => this.productsService.updateProductById(product, result)),
      )
      .subscribe({
        next: (response: Product) => {
          this.product.update((prod) => ({ ...prod, ...response }));
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  onSelectedImageHandler(index: number) {
    this.product.update((state) => ({
      ...state,
      product: {
        ...state.product,
        mainImage: state.product.images[index],
      }
    }));
  }

  openDeleteDialog(): void {
    // const dialogRef = this.dialogService.open(DeleteDialogComponent, {
    //   title: 'Confirm Deletion',
    // });
    // dialogRef.afterClosed$.pipe(filter(confirmed => confirmed === true)).subscribe(() => {
    //   console.log('Deleting item');
    //   // Handle delete logic here
    // });
  }

  // openUserDialog() {
  //   this.dialogService.openDialog({
  //     type: DIALOG_TYPE.user,
  //     title: 'Add New User',
  //   });
  // }

  // openProductDialog(product: Product) {
  //   debugger
  //   this.dialogService.openDialog({
  //     type: DIALOG_TYPE.product,
  //     title: 'Add New Product',
  //     data: product,
  //   });
  // }

  // openDeleteDialog() {
  //   this.dialogService.openDialog({
  //     type: DIALOG_TYPE.delete,
  //     title: 'Confirm Deletion',
  //   });
  // }

  // handleDialogClose() {
  //   debugger
  //   console.log('Close item');
  //   this.dialogService.closeDialog();
  // }

  // handleDialogSave(event: any) {
  //   debugger
  //   console.log('Saving:', event);
  //   // Handle save logic here
  //   this.dialogService.closeDialog();
  // }

  // handleDialogDelete() {
  //   console.log('Deleting item');
  //   // Handle delete logic here
  //   this.dialogService.closeDialog();
  // }


}
