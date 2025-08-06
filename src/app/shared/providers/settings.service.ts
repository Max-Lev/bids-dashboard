import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private _discount$ = new BehaviorSubject<number>(0);
  discount$ = this._discount$.asObservable();

  #stock = new BehaviorSubject<number>(0);
  stock$ = this.#stock.asObservable();

  isSettingsActive = new BehaviorSubject<{[key: string]: boolean}[]>([]);
  isActive = new BehaviorSubject< boolean>(false);

  constructor() {}

  getDiscount(): Observable<number> {
    return this._discount$;
  }
  setDiscount(discount: number) {
    this._discount$.next(discount);
  }
  
  setStock(discount: number) {
    this.#stock.next(discount);
  }
}
