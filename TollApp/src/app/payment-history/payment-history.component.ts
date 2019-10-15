import { Component, OnInit } from '@angular/core';
import {PaymentHistory}  from '../models/PaymentHistory';
import {TollService} from '../services/toll.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.scss'],
})
export class PaymentHistoryComponent {
  payementHistory:PaymentHistory[] = [];
  constructor(private  tollservice: TollService) { }

    ionViewWillEnter() {
        let id = '1';
        this.tollservice.getPaymentHistory(id).subscribe(data => {
           this.payementHistory = data;
           console.log('histroydata',this.payementHistory);
        })
    }
}
