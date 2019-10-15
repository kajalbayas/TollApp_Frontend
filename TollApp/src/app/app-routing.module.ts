import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PayementReciptComponent} from './payement-recipt/payement-recipt.component';
import {PaymentHistoryComponent}  from './payment-history/payment-history.component';

const routes: Routes = [
    {
      path: '',
      component:DashboardComponent
    },

    {
        path: 'payement-recipt/:paidetails',
        component:PayementReciptComponent
    },

    {
        path: 'payementhistory',
        component:PaymentHistoryComponent
    }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
