import { Component, computed, effect, input, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-form-error',
  standalone: true,
  template: `
    <!-- <div class="errors-container">
      @for (error of errorMessages(); track error) {
      <p class="error-msg">{{ error }}</p>
      }
    </div> -->
    <div class="errors-container">
      @for (error of errorMsg(); track error) {
      <p class="error-msg">{{ error }}</p>
      }
    </div>
  `,
})
export class FormErrorComponent implements OnChanges {
  /** The form control instance to check for errors. */
  control = input<{ [key: string]: any } | null>();
  /** A map of error keys to user-friendly messages. */
  @Input() errors: Record<string, string> = {};

  @Input() cntl!: AbstractControl<string | number | null, string | number | null> | null;

  // Generates a list of current error messages to display.
  // protected errorMessages = computed(() => {
  //   if (!this.control()) {
  //     return [];
  //   }
  //   // Find all error keys present on the control and return their corresponding messages.
  //   return Object.keys(this.control()!).map((key) => this.errors[key] || 'Invalid input');
  // });

  constructor() {}

  errorMsg = signal<string[] | null>([]);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cntl']) {
      this.errorMsg.update((_) => {
        if (this.cntl?.errors) {
          // console.log(this.cntl?.errors);
          return Object.keys(this.cntl?.errors!).map((key) => {
            // console.log({"this.errors[key]":this.errors[key],"this.errors: ":this.errors,"key: ":key});
            return this.errors[key] || 'Invalid input';
          });
        } else {
          return [];
        }
      });
    }
  }
}
