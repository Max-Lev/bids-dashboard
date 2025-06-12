import { CurrencyPipe, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input, OnInit } from '@angular/core';
import { Nft } from '../../../models/nft';
import { Product } from 'src/app/core/models/products';

@Component({
  selector: '[nft-single-card]',
  templateUrl: './nft-single-card.component.html',
  imports: [NgStyle, CurrencyPipe],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class NftSingleCardComponent implements OnInit {
  @Input() nft: Nft = <Nft>{};

  product = input<Product>();

  constructor() {}

  ngOnInit(): void {}
}
