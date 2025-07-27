import { NgComponentOutlet } from '@angular/common';
import { Component, inject, Type, Injector, HostListener} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogConfig, DialogRef } from './dialog-ref';
import { DIALOG_DATA } from './dialog-tokens';

@Component({
  selector: 'dialog-container',
  imports: [FormsModule, ReactiveFormsModule, NgComponentOutlet],
  standalone: true,
  templateUrl: './dialog-container.component.html',
  styleUrl: './dialog-container.component.css',
})
export class DialogContainer {
  config = inject(DialogConfig);
  dialogRef = inject(DialogRef);

  component: Type<any> = this.config.component;
  injector: Injector;


  constructor() {
    console.log(this.config.data )
    this.injector = Injector.create({
      providers: [
        { provide: DIALOG_DATA, useValue: this.config.data },
        { provide: DialogRef, useValue: this.dialogRef }
      ],
    });
    
  }

  close() {
    this.dialogRef.close();
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    this.close();
  }

  onBackdropClick() {
    if (this.config.closeOnBackdropClick) {
      this.close();
    }
  }
  // export class DialogContainer implements OnChanges, OnInit, AfterViewInit {
  // @Input() isOpen = false;
  // @Input() dialogData!: DialogData;

  // dialogComponent: any;
  // dialogInjector!: Injector;

  // private dialogMap = inject(DIALOG_COMPONENTS); // ✅ move inject here

  // DIALOG_TYPE = DIALOG_TYPE;
  // @Output() onClose = new EventEmitter<void>();
  // @Output() onSave = new EventEmitter<any>();
  // @Output() onDelete = new EventEmitter<void>();

  // constructor() {
  //   console.log('dialog container component');
  //   effect(() => {
  //     console.log(this.dialogData);
  //   });
  // }
  // ngAfterViewInit(): void {
  //   this.onSave.subscribe({
  //     next: (data: any) => {
  //       console.log(data);
  //     },
  //     error: (err: any) => {
  //       console.log(err);
  //     },
  //   });
  // }

  // ngOnInit() {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['dialogData'] && this.dialogData?.type) {
  //     console.log(this.dialogData);
  //     this.dialogComponent = this.dialogMap[this.dialogData.type]; // ✅ safe

  //     this.dialogInjector = Injector.create({
  //       providers: [
  //         { provide: PRODUCT_FORM_DATA, useValue: this.dialogData.data || {} },
  //         { provide: ON_CLOSE, useValue: () => this.onClose.emit() },
  //         { provide: ON_SAVE, useValue: (data: any) => this.onSave.emit(data) },
  //         { provide: ON_DELETE, useValue: () => this.onDelete.emit() },
  //       ],
  //     });
  //   }
  // }

  // userForm: UserFormData = {
  //   name: '',
  //   email: '',
  //   role: 'user',
  // };

  // productForm: ProductFormData = {
  //   productName: '',
  //   category: '',
  //   price: 0,
  //   description: '',
  // };

  // close() {
  //   debugger;
  //   this.isOpen = false;
  //   this.resetForms();
  //   this.onClose.emit();
  // }

  // onBackdropClick(event: Event) {
  //   if (event.target !== event.currentTarget) {
  //     this.close();
  //   }
  // }

  // saveUser() {
  //   this.onSave.emit({ type: DIALOG_TYPE.user, data: this.userForm });
  //   this.close();
  // }

  // saveProduct() {
  //   console.log(this.productForm)
  //   debugger;
  //   this.onSave.emit({ type: DIALOG_TYPE.product, data: this.productForm });
  //   this.close();
  // }

  // confirmDelete() {
  //   this.onDelete.emit();
  //   this.close();
  // }

  // private resetForms() {
  //   this.userForm = { name: '', email: '', role: 'user' };
  //   this.productForm = { productName: '', category: '', price: 0, description: '' };
  // }

  // @HostListener('document:keydown.escape', ['$event'])
  // handleEscape(event: KeyboardEvent) {
  //   if (this.isOpen) {
  //     this.close();
  //   }
  // }

  // prdForm = new FormGroup<{
  //   productName: FormControl<string | null>;
  //   category: FormControl<string | null>;
  //   price: FormControl<number | null>;
  //   description: FormControl<string | null>;
  // }>({
  //   productName: new FormControl<string>(''),
  //   category: new FormControl(''),
  //   price: new FormControl(0),
  //   description: new FormControl(''),
  // });
}
