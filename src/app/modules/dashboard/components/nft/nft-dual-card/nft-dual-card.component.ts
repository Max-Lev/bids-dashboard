import { CurrencyPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input, OnInit } from '@angular/core';
import { Nft } from '../../../models/nft';
import { Product, Products } from 'src/app/core/models/products';
import { DiscountPipe } from 'src/app/core/pipes/discount.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: '[nft-dual-card]',
  templateUrl: './nft-dual-card.component.html',
  imports: [
    NgStyle, 
    CurrencyPipe,
    DiscountPipe,
    RouterModule
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NftDualCardComponent implements OnInit {

  product = input<Product>();

  constructor() {}

  ngOnInit(): void {}
}
