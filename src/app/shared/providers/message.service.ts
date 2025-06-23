import { effect, Injectable, signal } from '@angular/core';
import { SaveBtnState } from 'src/app/core/models/saved-filter.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  saveBtnState = signal<SaveBtnState>({
    isSaveActive: false, count: 0,
    isDeleteActive: false,
    deleteIndex: -1,
    isUpdateActive: false
  });

  notifyProductsSrv = signal<boolean>(false);
  resetFormState = signal<boolean>(false);

  saveState() {
    this.saveBtnState.update((value: SaveBtnState) => {
      value = {
        ...value, ...{
          isSaveActive: false,
          isDeleteActive: false,
          isUpdateActive: false
        }
      };
      return value;
    });
    // console.log('saveState ', this.saveBtnState());
  }

  updateState() {
    if (this.saveBtnState().count < 5) {
      this.saveBtnState.update((value: SaveBtnState) => {
        value = {
          ...value, ...{
            isSaveActive: true,
            count: (value.isUpdateActive === false) ? value.count + 1 : value.count,
            isUpdateActive: true,
            isDeleteActive: false
          }
        };
        return value;
      });
      // console.log('updateState ', this.saveBtnState());
    }
  }

  // usePrevSaveState() {
  //   this.saveBtnState.update((value: SaveBtnState) => {
  //     value = {
  //       ...value, ...{
  //         isSaveActive: false,
  //         count: (value.isSaveActive) ? value.count - 1 : value.count,
  //         isDeleteActive: false
  //       }
  //     };
  //     return value;
  //   });
  //   console.log('usePrevSaveState ', this.saveBtnState());
  // }

  deleteState() {
    this.saveBtnState.update((state: SaveBtnState) => {
      return {
        ...state,
        isSaveActive: false,
        count: (state.count > 0) ? state.count - 1 : state.count,
        isDeleteActive: true,
      }
    });
  }

  /**
   * used to update selected delete index + activate delete btn
   */
  filterSelectedState(index: number) {
    this.saveBtnState.update((state: SaveBtnState) => {
      return {
        ...state,
        isSaveActive: false,
        isDeleteActive: true,
        deleteIndex: index + 1
      }
    });
    // console.log('filterSelectedState ', this.saveBtnState());
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
