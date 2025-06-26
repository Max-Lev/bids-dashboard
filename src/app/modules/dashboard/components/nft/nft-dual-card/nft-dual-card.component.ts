import { CurrencyPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input, OnInit, output } from '@angular/core';
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
    ImgUrlPipe
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NftDualCardComponent implements OnInit {

  product = input<Product>();

  onSelectedImage = output<number>();

  constructor() {}

  ngOnInit(): void {}
}
