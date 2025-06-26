import { NgStyle, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from 'src/app/core/models/products';
import { ImgUrlPipe } from 'src/app/shared/pipes/img-url.pipe';

@Component({
  selector: '[app-product-single-card]',
  imports: [
    CurrencyPipe, RouterModule,
  ],
  templateUrl: './product-single-card.component.html',
  styleUrl: './product-single-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSingleCardComponent {
  product = input<Product>();
  onSelectedImage = output<number>();
}
