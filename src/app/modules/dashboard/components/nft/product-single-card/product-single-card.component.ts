import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Product } from 'src/app/core/models/products';

@Component({
  selector: '[app-product-single-card]',
  imports: [
    AngularSvgIconModule, RouterModule,
    TitleCasePipe
  ],
  templateUrl: './product-single-card.component.html',
  styleUrl: './product-single-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSingleCardComponent {
  product = input<Product>();
  onSelectedImage = output<number>();
}
