import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Product, Products } from 'src/app/core/models/products';
import { MinMaxPipe } from 'src/app/core/pipes/min-max.pipe';

@Component({
  selector: 'app-mini-table',
  imports: [
    CurrencyPipe,
    TitleCasePipe,
    MinMaxPipe,
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

  get dataMaxPropValue(): string {
    const data = this.additionalData();
    if (data && data.prop && data.dataMax) {


      return data.dataMax[data.prop] as string;
    } return '';
  }
  get dataMinPropValue(): number {
    const data = this.additionalData();
    if (data && data.prop && data.dataMin) {
      return data.dataMin[data.prop] as number;
    } return 0;
  }

  constructor(){
    effect(()=>{
      console.log(this.additionalData());
    })
  }


}
