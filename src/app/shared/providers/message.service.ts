import { effect, Injectable, signal } from '@angular/core';
import { SaveBtnState } from 'src/app/core/models/saved-filter.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  saveBtnState = signal<SaveBtnState>({
    isSaveActive: false,
    count: 0,
    isDeleteActive: false,
    deleteIndex: -1,
    isChangeActive: false
  });

  notifyProductsSrv = signal<boolean>(false);
  resetFormState = signal<boolean>(false);

  saveState() {
    this.saveBtnState.update((state: SaveBtnState) => ({
      ...state,
      isSaveActive: false,
      isDeleteActive: false,
      isChangeActive: false
    }));
    // console.log('saveState ', this.saveBtnState());
  }

  onChangeState() {
    if (this.saveBtnState().count < 5) {
      this.saveBtnState.update((value: SaveBtnState) => ({
        ...value,
        isSaveActive: true,
        count: (value.isChangeActive === false) ? value.count + 1 : value.count,
        isChangeActive: true,
        isDeleteActive: false
      }));
      // console.log('onChangeState ', this.saveBtnState());
    }
  }


  deleteState() {
    this.saveBtnState.update((state: SaveBtnState) => ({
      ...state,
      isSaveActive: false,
      count: (state.count > 0) ? state.count - 1 : state.count,
      isDeleteActive: true,
    }));
    // console.log('deleteState ', this.saveBtnState());
  }

  /**
   * used to update selected delete index + activate delete btn
   */
  onSaveBtnSelectedState(index: number) {
    this.saveBtnState.update((state: SaveBtnState) => ({
      ...state,
      isSaveActive: false,
      isDeleteActive: true,
      deleteIndex: index + 1
    }));
    // console.log('filterSelectedState ', this.saveBtnState());
  }

  updateCount(count: number) {
    this.saveBtnState.update((state) => ({ ...state, count }));
    // console.log('updateCount ', this.saveBtnState());
  }

  notifyProductsHandler(state: boolean) {
    this.notifyProductsSrv.set(state);
  }


  constructor() {
    effect(() => {
      // console.log('saveBtnState ', this.saveBtnState());
      // console.log('updateProducts ', this.notifyProductsSrv());
    });
  }

}
