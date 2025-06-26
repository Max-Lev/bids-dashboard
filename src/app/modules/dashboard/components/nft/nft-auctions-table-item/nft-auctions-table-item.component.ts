import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Nft } from '../../../models/nft';
import { Product } from 'src/app/core/models/products';
import { DiscountPipe } from 'src/app/core/pipes/discount.pipe';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: '[nft-auctions-table-item]',
  templateUrl: './nft-auctions-table-item.component.html',
  imports: [AngularSvgIconModule, 
    CurrencyPipe,
    DiscountPipe,
    RouterModule
  ],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NftAuctionsTableItemComponent implements OnInit {
  @Input() auction = <Nft>{};

  product = input<Product>();

  constructor() {}

  ngOnInit(): void {
    // console.log(this.auction);
  }

  
}
