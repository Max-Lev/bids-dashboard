import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  Type,
  ComponentRef,
} from '@angular/core';
import { take } from 'rxjs';
import { DialogContainer } from 'src/app/shared/components/dialogs/dialog-container.component';
import { DialogConfig, DialogRef } from 'src/app/shared/components/dialogs/dialog-ref';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private appRef = inject(ApplicationRef);
  private defaultInjector = inject(EnvironmentInjector);
  private dialogComponentRef?: ComponentRef<DialogContainer>;

  public open<T>(componentType: Type<T>, config?: Partial<DialogConfig>): DialogRef {
    console.log('config', config);

    const dialogConfig = {
      ...new DialogConfig(),
      ...config,
      component: componentType,
    };
    const dialogRef = new DialogRef();

    const injector = Injector.create({
      providers: [
        { provide: DialogConfig, useValue: dialogConfig },
        { provide: DialogRef, useValue: dialogRef },
      ],
      parent: this.defaultInjector,
    });

    this.dialogComponentRef = createComponent(DialogContainer, {
      environmentInjector: this.defaultInjector,
      elementInjector: injector,
    });

    this.appRef.attachView(this.dialogComponentRef.hostView);
    const domElem = (this.dialogComponentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    dialogRef.afterClosed$.pipe(take(1)).subscribe(() => {
      this.removeDialog();
    });

    return dialogRef;
  }

  private removeDialog() {
    if (this.dialogComponentRef) {
      this.appRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.destroy();
      this.dialogComponentRef = undefined;
    }
  }
}

