import { ChangeDetectionStrategy, Component, computed, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NftDualCardComponent } from '../../components/nft/nft-dual-card/nft-dual-card.component';
import { NftSingleCardComponent } from '../../components/nft/nft-single-card/nft-single-card.component';

@Component({
  selector: 'app-product',
  imports: [
    NftDualCardComponent,
    NftSingleCardComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponent implements OnInit {

  activatedRoute = inject(ActivatedRoute);
  productId = computed(() => this.activatedRoute.snapshot.params['id']);
  product = computed(() => this.activatedRoute.snapshot.data['productResolver']);

  constructor() {
    effect(() => {
      console.log(this.product());
    })
  }

  ngOnInit(): void {

  }
}
