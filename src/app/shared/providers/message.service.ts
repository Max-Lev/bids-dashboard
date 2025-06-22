import { effect, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  saveBtnState = signal<{ active: boolean, count: number }>({ active: false, count: 0 });
  notifyProductsSrv = signal<boolean>(false);
  resetFormState = signal<boolean>(false);

  updateSaveState(active: boolean) {
    this.saveBtnState.update((value: { active: boolean; count: number; }) => {
      value = {
        ...value, ...{
          active,
          count: (!this.saveBtnState().active) ? value.count + 1 : value.count
        }
      };   
      return value;
    });
  }

  usePrevSaveState() {
    this.saveBtnState.update((value: { active: boolean; count: number; }) => {
      value = {
        ...value, ...{
          active: false,
          count: (value.active) ? value.count - 1 : value.count
        }
      };
      return value;
    });
    console.log('usePrevSaveState ', this.saveBtnState());
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
