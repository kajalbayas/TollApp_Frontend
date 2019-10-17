import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {DashboardComponent}  from './dashboard/dashboard.component';
import {PayementReciptComponent}  from './payement-recipt/payement-recipt.component';
import {PaymentHistoryComponent} from './payment-history/payment-history.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import {ReactiveFormsModule,FormsModule}  from '@angular/forms';
import {ExceptionHandlerInterceptorService}  from './services/exception-handler-interceptor.service';

@NgModule({
  declarations: [AppComponent,DashboardComponent,PayementReciptComponent,PaymentHistoryComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,ReactiveFormsModule,FormsModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      {provide: HTTP_INTERCEPTORS, useClass: ExceptionHandlerInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
