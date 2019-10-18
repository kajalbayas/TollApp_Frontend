import { Component, OnInit } from '@angular/core';
import {PaymentHistory}  from '../models/PaymentHistory';
import {TollService} from '../services/toll.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
})
export class PaymentHistoryComponent {

    payementHistory:any;

    constructor(private  tollservice: TollService, private  router:Router) { }

    ionViewWillEnter() {
        let id = '1';
        this.tollservice.getPaymentHistory(id).subscribe(data => {
            console.log('data',  data);
            this.payementHistory = data;
        })
    }

    goBack() {
        this.router.navigateByUrl('');
    }
}
