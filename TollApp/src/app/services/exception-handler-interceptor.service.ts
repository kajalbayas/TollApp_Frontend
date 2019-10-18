import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {ToastController} from '@ionic/angular';
import {ToastService} from './toasterservice.service';
import {TollService} from './toll.service';
import {MESSAGES} from '../constants/constants';

@Injectable({
  providedIn: 'root'
})
export class ExceptionHandlerInterceptorService {

  constructor(private toastService:ToastService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
            }
}
