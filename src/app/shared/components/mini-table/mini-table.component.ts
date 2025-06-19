import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Product, Products } from 'src/app/core/models/products';
import { MinMaxPipe } from 'src/app/core/pipes/min-max.pipe';

@Component({
  selector: 'app-mini-table',
  imports: [
    CurrencyPipe,
    AngularSvgIconModule
  ],
  templateUrl: './mini-table.component.html',
  styleUrl: './mini-table.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MiniTableComponent {

  additionalData = input<{
    dataMin: Product; 
    dataMax: Product;
    prop: keyof Product,
    order: "asc" | "desc",
    list:Products,
    selectedItem: {} | Product;
  }>();


  prop = this.additionalData()?.prop;




}
