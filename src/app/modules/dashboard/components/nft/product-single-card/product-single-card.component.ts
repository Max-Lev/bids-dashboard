import { NgClass, TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Product } from 'src/app/core/models/products';
import { StrictUser } from 'src/app/core/models/user.model';

@Component({
  selector: '[app-product-single-card]',
  imports: [
    AngularSvgIconModule, RouterModule,
    TitleCasePipe,
    NgClass
  ],
  templateUrl: './product-single-card.component.html',
  styleUrl: './product-single-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSingleCardComponent {

  product = input.required<Product>();

  onSelectedImage = output<number>();

  constructor(){
    effect(()=>{
      
    })
  }

}
