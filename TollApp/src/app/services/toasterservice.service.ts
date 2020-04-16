import { Injectable } from '@angular/core';
import {ToastController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastController: ToastController) {}

    async showToast(msg: string) {
        const toast = await this.toastController.create({
            message: msg,
            position: 'bottom',
            duration: 3000
        });
        toast.present();
    }
}