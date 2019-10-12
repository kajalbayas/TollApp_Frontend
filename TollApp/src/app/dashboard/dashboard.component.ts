import { Component, OnInit } from '@angular/core';
import {TollService} from '../services/toll.service';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    alltollplazas:any;
    towords:any;
    selectedTowards:string;
    exitLocation:string;
    vehicleList:any;
    constructor(private  tollservice: TollService) { }
    ionViewWillEnter() {
        this.tollservice.getAllTollPlazas().subscribe( res => {
            console.log(res);
            this.alltollplazas = res;
            console.log(res);
        });
    }
    ngOnInit() {}
    getRoute(data) {
        console.log(data);
        this.tollservice.getToFrombyId(data.detail.value).subscribe(res => {
            console.log('get route', res);
            this.towords = res;
            this.getVehicles();
        });
    }
    selectTowords(towards) {
        console.log(towards);
        this.selectedTowards = towards;
    }
      getVehicles() {
        this.tollservice.getVehicleList().subscribe( res=> {
            console.log('vehicle',res );
             this.vehicleList = res;
        })
      }

    getTollCost(data) {
        console.log('data', data);
        this.tollservice.getCostByLocIdVehTypeId(data.VehicleTypeId).subscribe( res=> {
            console.log(res);
        })
    }
}
