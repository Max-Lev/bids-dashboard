import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface SettingsState {
  discount: { value: number; isActive: boolean };
  stock: { value: number; isActive: boolean };
}

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _discount$ = new BehaviorSubject<number>(0);
  discount$ = this._discount$.asObservable();

  #stock = new BehaviorSubject<number>(0);
  stock$ = this.#stock.asObservable();

  readonly formState = signal<SettingsState>({
    discount: { value: 0, isActive: false },
    stock: { value: 0, isActive: false }
  });

  constructor() {}

  setFormState(state: SettingsState) {
    this.formState.set(state);
  }

}
