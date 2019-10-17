import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {ToastController} from '@ionic/angular';
import {ToastService} from 'toasterservice.service';
import {TollService} from './toll.service';
import {Network} from '@ionic-native/network/ngx';
import {MESSAGES} from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ExceptionHandlerInterceptorService {

  constructor(private toastService:ToastService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.network.type !== 'none') {
            return next.handle(req)
                .pipe(
                    tap(
                        event => {
                        },
                        error => {
                            console.log('error', error);
                            this.toastService.showToast(error.message);
                        }
                    ),
                    finalize(() => {
                    })
                );
        } else {
            this.toastService.showToast(MESSAGES.INETRNET_CONNECTION);
        }
    }
}
