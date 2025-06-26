import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, Input, OnChanges, OnInit, output, SimpleChanges } from '@angular/core';
import { Nft } from '../../../models/nft';
import { Product } from 'src/app/core/models/products';
import { DiscountPipe } from 'src/app/core/pipes/discount.pipe';
import { RouterModule } from '@angular/router';
import { ImgUrlPipe } from 'src/app/shared/pipes/img-url.pipe';

@Component({
  selector: '[nft-dual-card]',
  templateUrl: './nft-dual-card.component.html',
  imports: [
    NgStyle, 
    CurrencyPipe,
    DiscountPipe,
    RouterModule,
    ImgUrlPipe,
    NgClass
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NftDualCardComponent implements OnInit,OnChanges {

  product = input<Product>();
  additionalImgs = input<boolean>(false);

  onSelectedImage = output<number>();

  constructor() {
    effect(()=>{
      
    })
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.additionalImgs())
  }

  ngOnInit(): void {}
}
