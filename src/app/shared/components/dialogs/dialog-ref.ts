import { Subject } from 'rxjs';

export class DialogRef {
  private readonly _afterClosed = new Subject<any>();
  public readonly afterClosed$ = this._afterClosed.asObservable();

  close(result?: any) {
    this._afterClosed.next(result);
  }
}

import { Type } from '@angular/core';

export class DialogConfig<D = any> {
  component!: Type<any>;
  title?: string = 'Dialog';
  data?: D;
  closeOnBackdropClick? = true;
}