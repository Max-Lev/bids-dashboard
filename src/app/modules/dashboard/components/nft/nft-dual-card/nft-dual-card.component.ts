import { CurrencyPipe, NgClass, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, input, Input, OnChanges, OnInit, Output, output, SimpleChanges } from '@angular/core';
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

  @Input({required:false}) mainBtnText = 'Place a Bid';
  @Input({required:false}) displayMainBtn = true;
  @Input({required:false}) secondaryBtnText = 'View Item';
  @Input({required:false}) displaySecondaryBtn = true;

  onMainBtnClick = output<Product>();

  constructor() {
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }

  ngOnInit(): void {}
}
