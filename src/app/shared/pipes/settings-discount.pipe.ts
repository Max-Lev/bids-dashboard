import { computed, effect, inject, Pipe, PipeTransform } from '@angular/core';
import { SettingsService } from '../providers/settings.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Pipe({
  name: 'settingsDiscount',
  standalone: true,
  pure: false,
})
export class SettingsDiscountPipe implements PipeTransform {
  settingsService = inject(SettingsService);
  
   #discount = toSignal(this.settingsService.discount$);
  readonly discount = computed(() => this.#discount());

  private lastDiscount = 0;
  private lastValue: number | null = null;
  private lastResult: string = 'text-muted-foreground';

  constructor() {
    effect(() => {
      console.log(this.discount());
    });
  }

  transform(value: number): string {
    const currentDiscount = this.discount();

    if (value !== this.lastValue || currentDiscount !== this.lastDiscount) {
      this.lastValue = value;
      this.lastDiscount = currentDiscount ?? 0;
      this.lastResult = value < (currentDiscount ?? 0) ? 'text-red-500' : 'text-muted-foreground';
    }

    return this.lastResult;
  }


}
