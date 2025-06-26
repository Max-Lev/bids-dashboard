import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import {provideHttpClient } from '@angular/common/http';
import { ProductsService } from 'src/app/core/services/products.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    DashboardRoutingModule,
    RouterModule
  ],
  providers:[
    provideHttpClient(),
    ProductsService,
  ],
  declarations:[
    
  ]

})
export class DashboardModule {}
