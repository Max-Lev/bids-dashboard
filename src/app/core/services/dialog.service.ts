// dialog.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DialogData } from 'src/app/shared/components/dialogs/edit-product-dialog/dialog-container.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogState = new BehaviorSubject<{
    isOpen: boolean;
    data: DialogData | null;
  }>({
    isOpen: false,
    data: null
  });

  dialogState$ = this.dialogState.asObservable();

  openDialog(data: DialogData) {
    console.log('openDialog data ',data);
    this.dialogState.next({
      isOpen: true,
      data
    });
  }

  closeDialog() {
    this.dialogState.next({
      isOpen: false,
      data: null
    });
  }
}