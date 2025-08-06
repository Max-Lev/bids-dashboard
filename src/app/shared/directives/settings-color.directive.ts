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


@Directive({
  selector: '[appSettingColor]',
  standalone: true,
})
export class SettingsColorDirective implements OnChanges {
  
  private settingsService = inject(SettingsService);
  private el = inject(ElementRef<HTMLElement>);
  
  @Input('appSettingColor') field!: 'discount' | 'stock';
  @Input() value!: number;

  constructor(private renderer: Renderer2) {
    effect(() => {
      
        // Decide which state to check
        const isActive = this.settingsService.formState()[this.field].isActive;
        const {discount, stock} = this.settingsService.formState();//[this.field];
        
        let signalValue = (this.field === 'discount') ? discount.value: stock.value;
  
        let colorClass = 'text-muted-foreground';
  
        if (this.value != null && isActive) {
          colorClass = this.value < (signalValue ?? 0) ? 'text-red-500': 'text-green-500';}
  
        // Remove previous and apply, per element
        this.renderer.removeClass(this.el.nativeElement, 'text-red-500');
        this.renderer.removeClass(this.el.nativeElement, 'text-green-500');
        this.renderer.removeClass(this.el.nativeElement, 'text-muted-foreground');
  
        if (colorClass) {
          this.renderer.addClass(this.el.nativeElement, colorClass);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
