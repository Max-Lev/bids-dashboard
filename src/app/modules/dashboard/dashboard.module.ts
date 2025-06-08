import { NgModule } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/core/services/products.service';
import { DiscountPipe } from 'src/app/core/pipes/discount.pipe';

@NgModule({
  imports: [
    DashboardRoutingModule,
    // HttpClientModule
  ],
  providers:[
    provideHttpClient(),
    ProductsService,
  ],

})
export class DashboardModule {}
