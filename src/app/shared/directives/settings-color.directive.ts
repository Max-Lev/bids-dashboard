import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  inject,
  computed,
  effect,
  SimpleChanges,
  OnChanges,
  Renderer2,
  Signal,
} from '@angular/core';
import { SettingsService } from '../providers/settings.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Directive({
  selector: '[appDiscountValue], [appStockValue]',
  standalone: true,
})
export class SettingsColorDirective implements OnChanges {
  @Input('appDiscountValue') discountValue!: number;
  @Input('appStockValue') stockValue!: number;

  private el = inject(ElementRef<HTMLElement>);
  private settingsService = inject(SettingsService);

  private discountSignal = toSignal(this.settingsService.getDiscount());
  private stockSignal = toSignal(this.settingsService.stock$);
  private isSettingsActive: Signal<{ [key: string]: boolean }[] | undefined> = toSignal(
    this.settingsService.isSettingsActive,
  );
  isActive = toSignal(this.settingsService.isActive);

  constructor(private renderer: Renderer2) {
    effect(() => {
      
      let colorClass = 'text-muted-foreground';
      const active = this.isSettingsActive();
      
      const discountKey: { [key: string]: boolean } | undefined = active?.find((item) => item['discount']);
      const stockKey: { [key: string]: boolean } | undefined = active?.find((item) => item['stock']);
      
      

      if (this.isActive()) {
        // Apply discount-based color
        if (this.discountValue != null && discountKey && discountKey['discount']) {
          // if((discountKey && discountKey['discount'])){
          colorClass = this.discountValue < (this.discountSignal() ?? 0) ? 'text-red-500' : 'text-green-500';
          // }
        }

        // Apply stock-based color (overrides if both used)
        if (this.stockValue != null && stockKey && stockKey['stock']) {
          // if((stockKey && stockKey['stock'])){
          colorClass = this.stockValue < (this.stockSignal() ?? 0) ? 'text-red-500' : 'text-green-500';
          // }
        }

        // Clear previous color classes
        this.renderer.removeClass(this.el.nativeElement, 'text-red-500');
        this.renderer.removeClass(this.el.nativeElement, 'text-green-500');
        this.renderer.removeClass(this.el.nativeElement, 'text-muted-foreground');

        // Apply the new color class
        if (colorClass) {
          this.renderer.addClass(this.el.nativeElement, colorClass);
        }

        this.discountSignal();
        this.stockSignal();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
