import { NgComponentOutlet } from "@angular/common";
import { Component, ChangeDetectionStrategy, OnInit, OnChanges, Input, inject, DestroyRef, signal, effect, SimpleChanges } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { filter } from "rxjs";
import { Product } from "src/app/core/models/products";
import { DialogService } from "src/app/core/services/dialog.service";
import { DialogContainer } from "src/app/shared/components/dialogs/dialog-container.component";
import { DialogData, IProductFormData } from "src/app/shared/components/dialogs/dialog.models";
import { ProductsDialogComponent } from "src/app/shared/components/dialogs/products-dialog/products-dialog.component";
import { NftDualCardComponent } from "../../components/nft/nft-dual-card/nft-dual-card.component";
import { ProductSingleCardComponent } from "../../components/nft/product-single-card/product-single-card.component";

@Component({
  selector: 'app-product',
  imports: [
    NftDualCardComponent,
    // NftSingleCardComponent,
    ProductSingleCardComponent,
    DialogContainer,
    NgComponentOutlet,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductComponent implements OnInit, OnChanges {
  @Input() id: string = '';

  activatedRoute = inject(ActivatedRoute);
  destroy$ = inject(DestroyRef);

  product = signal<Product>(this.activatedRoute.snapshot.data['productResolver'] as Product);

  currentDialog = { isOpen: false, data: null as DialogData | null };

  constructor(private dialogService: DialogService) {
    // this.dialogService.dialogState$.pipe(takeUntilDestroyed(this.destroy$)).subscribe((state) => {
    //   console.log('state: ', state);
    //   this.currentDialog = state;
    // });

    effect(() => {
      console.log(this.product());
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes, this.id);
  }

  openProductDialog(product: Product): void {
    const dialogRef = this.dialogService.open(ProductsDialogComponent, {
      title: 'Edit Product',
      data: { product }, // Pass the product data here
    });

    dialogRef.afterClosed$.pipe(takeUntilDestroyed(this.destroy$))
      .pipe(filter((result) => !!result))
      .subscribe((updatedProductData: IProductFormData) => {
        console.log('Saving:', updatedProductData);
        // Update the product signal with the returned form data
        this.product.update((product: Product) => ({ ...product, ...updatedProductData }));
      });
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

  ngOnInit(): void {
    // this.openProductDialog();
  }

  onSelectedImageHandler(index: number) {
    this.product.update((prod) => ({ ...prod, mainImage: prod.images[index] }));
  }
}
