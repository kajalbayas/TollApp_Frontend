import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component'

const routes: Routes = [
    {
      path: 'dashboard',
      component:DashboardComponent
    }
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: 'dashboard', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
