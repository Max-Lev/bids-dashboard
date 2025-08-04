import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _discount$ = new BehaviorSubject<number>(0);
  discount$ = this._discount$.asObservable();

  constructor(){
    
  }

  getDiscount():Observable<number>{
    return this._discount$;
  }
  setDiscount(discount:number){
     this._discount$.next(discount);
  }


}
