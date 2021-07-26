import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersComponent } from '../orders/orders.component';

const routes: Routes = [
    { path: 'orders/:id', component: OrdersComponent},
    { path: '**', pathMatch: 'full', redirectTo: '/customers' }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})
export class OrdersRoutingModule {

}