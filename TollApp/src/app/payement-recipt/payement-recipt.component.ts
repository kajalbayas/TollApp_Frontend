import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {PaymentHistory}  from '../models/PaymentHistory';


@Component({
  selector: 'app-payement-recipt',
  templateUrl: './payement-recipt.component.html',
  styleUrls: ['./payement-recipt.component.scss'],
})
export class PayementReciptComponent implements OnInit {

  payementDetails:any=[];
  payementDetails1:PaymentHistory[] = [];

  constructor(private activatedRoute: ActivatedRoute,private router:Router) { }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
            this.payementDetails = JSON.parse(paramMap.get('paidetails'));
            console.log('detsild',this.payementDetails)
        });
    }

    gotopaymenthistory () {
        this.router.navigateByUrl('/payementhistory');
    }

    gotoHomePage() {
        this.router.navigateByUrl('');
    }

}
