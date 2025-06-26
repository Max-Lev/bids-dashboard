import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {provideHttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/core/services/products.service';

@NgModule({
  imports: [
    DashboardRoutingModule,
  ],
  providers:[
    provideHttpClient(),
    ProductsService,
  ],

})
export class DashboardModule {}
