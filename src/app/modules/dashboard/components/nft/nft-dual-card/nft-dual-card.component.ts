import { CurrencyPipe, NgStyle } from '@angular/common';
import { Component, input, Input, OnInit } from '@angular/core';
import { Nft } from '../../../models/nft';
import { Product, Products } from 'src/app/core/models/products';
import { DiscountPipe } from 'src/app/core/pipes/discount.pipe';

@Component({
  selector: '[nft-dual-card]',
  templateUrl: './nft-dual-card.component.html',
  imports: [
    NgStyle, 
    CurrencyPipe,
    DiscountPipe
  ],
})
export class NftDualCardComponent implements OnInit {
  @Input() nft: Nft = <Nft>{};

  // @Input() product!:Product;

  product = input<Product>();

  constructor() {}

  ngOnInit(): void {}
}
