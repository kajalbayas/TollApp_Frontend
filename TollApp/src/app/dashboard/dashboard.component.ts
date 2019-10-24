import { Component, OnInit } from '@angular/core';
import { TollService } from '../services/toll.service';
import { FormControl, Validators } from '@angular/forms';
import { MESSAGES } from '../constants/constants';
import { ToastService } from '../services/toasterservice.service';
import { Router } from '@angular/router';
import { PayNow } from '../models/PayNow';
import { Tollplaza } from '../models/tollplaza';
import { Vehicle } from '../models/Vehicles';
import { PaymentHistory } from '../models/PaymentHistory';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    payNowObj: PayNow;
    alltollplazas: Tollplaza[];
    vehicleList: Vehicle[];
    tollData: any = [];
    vechileNo = new FormControl();
    payementDetails: PaymentHistory[] = [];
    tollList: Tollplaza[];

    constructor(private tollservice: TollService, private toasterservice: ToastService, private router: Router) {
        this.payNowObj = new PayNow();
    }

    ionViewWillEnter() {
        this.tollservice.getAllTollPlazas().subscribe((res: any) => {
            this.alltollplazas = res;
        });
    }

    ngOnInit() {
        this.getTollCost();
        this.payNowObj.selectedButton = false;
    }

    getRoute(data) {
        localStorage.setItem('selectedFromLoc', data.detail.value);
        const routeId = this.alltollplazas.find(obj => {
            return obj.Id == data.detail.value
        });
        this.payNowObj.RouteId = routeId.RouteId;
        this.tollservice.getToFrombyId(routeId.RouteId).subscribe((res: any) => {
            this.payNowObj.towords = res;
            this.getVehicles();
        });
    }

    selectTowords(towards, direction) {
        this.payNowObj.selectedButton = true;
        this.payNowObj.Amount = 0;
        this.payNowObj.selectedTowards = towards;
        this.getTollPlaza(direction);
    }

    getTollPlaza(direction) {
        let tollId = localStorage.getItem('selectedFromLoc');
        if (direction) {
            this.tollList = this.alltollplazas.filter(obj => {
                return obj.Id > tollId && this.payNowObj.RouteId == obj.RouteId
            })
            if (this.tollList.length == 0) {
                this.payNowObj.ExitLocId = '1';
            }

        } else {
            this.tollList = this.alltollplazas.filter(obj => {
                return obj.Id < tollId && this.payNowObj.RouteId == obj.RouteId
            })
            if (this.tollList.length == 0) {
                this.payNowObj.ExitLocId = '1';
            }
        }
    }

    getVehicles() {
        this.tollservice.getVehicleList().subscribe((res: Vehicle[]) => {
            this.vehicleList = res;
        });
    }

    getTollCost() {
        this.tollservice.getTollCost().subscribe(res => {
            this.tollData = res;
        });
    }

    selectedVechileType(value) {
        let tollCostData;
        if (this.payNowObj.ExitLocId != '1') {
            let tollId = localStorage.getItem('selectedFromLoc');
            tollCostData = this.tollData.find(obj => {
                return obj.Toll[0].Id == tollId && obj.ExitLocation[0].Id == this.payNowObj.ExitLocId && obj.VehicleType[0].VehicleTypeId == value
            });
        } else {
            tollCostData = this.tollData.find(obj => {
                return obj.VehicleType[0].VehicleTypeId == value
            })
        }
        console.log('tollcostdata',tollCostData);
        this.payNowObj.Amount = tollCostData.Cost;
        this.payNowObj.UserId = "1";
        this.payNowObj.VehicleTypeId = tollCostData.VehicleType[0].VehicleTypeId
    }

    payNow() {
        if (this.vechileNo.value) {
            this.payNowObj.VehicleNumber = this.vechileNo.value;
            this.tollservice.payTollCost(this.payNowObj).subscribe((res: any) => {
                this.payementDetails = res;
                this.toasterservice.showToast(MESSAGES.PAY_NOW)
                // this.toastmsg();
                this.router.navigate(['/payement-recipt', JSON.stringify(this.payementDetails)]);
            })
        } else {
            this.vechileNo.setErrors({ required: true })
        }
    }
}
