import { NgClass } from '@angular/common';
import { Component, effect, input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Product, Review } from 'src/app/core/models/products';
import { StrictUser } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-review',
  imports: [
    AngularSvgIconModule
  ],
  templateUrl: './user-review.component.html',
  styleUrl: './user-review.component.css'
})
export class UserReviewComponent {

  users = input.required<(StrictUser | undefined)[]>({});
  reviews = input.required<Review[]>({});
  product = input.required<Product>({});

  Array = Array;
  Math = Math;

  constructor() { 
    effect(()=>{
      this.product().reviews.sort((a,b)=>b.rating-a.rating);
    });
  
  }

  getRatingCategory(rating: number): 'poor' | 'fair' | 'good' | 'excellent' {
    if (rating < 2) return 'poor';
    if (rating < 3) return 'fair';
    if (rating < 4) return 'good';
    return 'excellent';
  }

}
