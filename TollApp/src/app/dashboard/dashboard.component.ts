import {Component, OnInit} from '@angular/core';
import {TollService} from '../services/toll.service';
import {FormControl, Validators} from '@angular/forms';
import {MESSAGES} from '../constants/constants';
import {ToastService} from '../services/toasterservice.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    alltollplazas: any = [];
    towords: any;
    selectedTowards: string;
    selectedButton: boolean;
    exitLocation: string;
    vehicleList: any;
    tollData: any = [];
    tollCostData: any;
    RouteId: any;
    vechileNo = new FormControl();
    invalidVechNo = false;
    payementDetails: any = [];

    constructor(private  tollservice: TollService, private toasterservice: ToastService, private router: Router) {
    }

    ionViewWillEnter() {
        this.tollservice.getAllTollPlazas().subscribe(res => {
            this.alltollplazas = res;
        });
    }

    ngOnInit() {
        this.getTollCost();
        this.selectedButton = false;
        this.vechileNo.valueChanges.subscribe(res => {
            if (res) {
                this.invalidVechNo = false;
            }
        })
    }

    getRoute(data) {
        localStorage.setItem('selectedFromLoc', data.detail.value);
        const routeId = this.alltollplazas.find(obj => {
            if (obj.Id == data.detail.value) {
                this.RouteId = obj.RouteId;
                return obj.RouteId
            }
        });

        this.tollservice.getToFrombyId(routeId.RouteId).subscribe(res => {
            this.towords = res;
            this.getVehicles();
        });
    }

    selectTowords(towards, direction) {
        this.selectedButton = true;
        this.tollCostData = undefined;
        this.selectedTowards = towards;
        this.getTollPlaza(direction);
        localStorage.setItem('toDirection', direction);

    }

    tollList: any = []

    getTollPlaza(direction) {
        let tollId = localStorage.getItem('selectedFromLoc');
        if (direction) {
            this.tollList = this.alltollplazas.filter(obj => {
                return obj.Id > tollId && this.RouteId == obj.RouteId
            })
            console.log(this.tollList)
            if (this.tollList.length == 0) {
                this.exitLocation = '1';
            }

        } else {
            this.tollList = this.alltollplazas.filter(obj => {
                return obj.Id < tollId && this.RouteId == obj.RouteId
            })
            console.log(this.tollList)
            if (this.tollList.length == 0) {
                this.exitLocation = '1';
            }
        }
    }

    getVehicles() {
        this.tollservice.getVehicleList().subscribe(res => {
            this.vehicleList = res;
        });
    }

    getTollCost() {
        this.tollservice.getTollCost().subscribe(res => {
            this.tollData = res;
        });
    }

    selectedVechileType(value) {
        if (this.exitLocation != '1') {
            let tollId = localStorage.getItem('selectedFromLoc');
            this.tollData.find(obj => {
                if (obj.Toll[0].Id == tollId && obj.ExitLocation[0].Id == this.exitLocation && obj.VehicleType[0].VehicleTypeId == value) {
                    this.tollCostData = obj;
                    return true;
                }
            })
        } else {
            this.tollData.find(obj => {
                if (obj.VehicleType[0].VehicleTypeId == value) {
                    this.tollCostData = obj;
                    console.log('costdata', this.tollCostData);
                    return true;
                }
            })
        }
    }

    payNow() {
        if (this.vechileNo.value) {
            this.invalidVechNo = false;
            let obj = {
                'UserId': '1',
                'ExitLocId': this.tollCostData.ExitLocation[0].Id,
                'VehicleTypeId': this.tollCostData.VehicleType[0].VehicleTypeId,
                'RouteId': this.RouteId,
                'Amount': this.tollCostData.Cost,
                'VehicleNumber': this.vechileNo.value
            }

            this.tollservice.payTollCost(obj).subscribe(res => {
                this.payementDetails = res;
                this.toasterservice.showToast(MESSAGES.PAY_NOW)
                // this.toastmsg();
                this.router.navigate(['/payement-recipt', JSON.stringify(this.payementDetails)]);
            })
        }
    }
}
