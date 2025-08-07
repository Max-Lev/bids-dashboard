import { Observable, Subject, throttleTime } from 'rxjs';
import { signal, Type } from '@angular/core';

export class DialogRef {
  private readonly _afterClosed = new Subject<any>();
  public readonly afterClosed$ = this._afterClosed.asObservable();

  private readonly _onChange = new Subject<any>();
  public readonly onChange$: Observable<any> = this._onChange.asObservable();

  close(result?: any) {
    this._afterClosed.next(result);
  }

  emitChange(value: any) {
    this._onChange.next(value);
  }

}



export class DialogConfig<D = any> {
  component!: Type<any>;
  title?: string = 'Dialog';
  data?: D;
  closeOnBackdropClick? = true;
}