import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftDualCardComponent } from '../../components/nft/nft-dual-card/nft-dual-card.component';
import { NftSingleCardComponent } from '../../components/nft/nft-single-card/nft-single-card.component';
import { DialogService } from 'src/app/core/services/dialog.service';
import { DialogData, DialogContainer } from 'src/app/shared/components/dialogs/edit-product-dialog/dialog-container.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-product',
  imports: [
    NftDualCardComponent,
    NftSingleCardComponent,
    DialogContainer
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  productId = computed(() => this.activatedRoute.snapshot.params['id']);
  product = computed(() => this.activatedRoute.snapshot.data['productResolver']);
  destroy$ = inject(DestroyRef);
  currentDialog = {
    isOpen: false,
    data: null as DialogData | null
  };


  constructor(private dialogService: DialogService) {
    this.dialogService.dialogState$.pipe(takeUntilDestroyed(this.destroy$)).subscribe(state => {
      console.log(state);
      this.currentDialog = state;
    });

    effect(() => {
      console.log(this.product());
    })
  }

  openUserDialog() {
    this.dialogService.openDialog({
      type: 'user',
      title: 'Add New User'
    });
  }

  openProductDialog() {
    this.dialogService.openDialog({
      type: 'product',
      title: 'Add New Product'
    });
  }

  openDeleteDialog() {
    this.dialogService.openDialog({
      type: 'delete',
      title: 'Confirm Deletion'
    });
  }

  handleDialogClose() {
    console.log('Close item');
    this.dialogService.closeDialog();
  }

  handleDialogSave(event: any) {
    console.log('Saving:', event);
    // Handle save logic here
    this.dialogService.closeDialog();
  }

  handleDialogDelete() {
    console.log('Deleting item');
    // Handle delete logic here
    this.dialogService.closeDialog();
  }

  ngOnInit(): void {

  }

}
