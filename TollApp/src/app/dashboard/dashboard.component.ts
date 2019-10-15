import { Component, OnInit } from '@angular/core';
import {TollService} from '../services/toll.service';
import {HttpClient} from '@angular/common/http';
import { FormControl, Validators } from '@angular/forms';
import {ToastController} from '@ionic/angular';
import {Router} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

    alltollplazas:any = [];
    towords:any;
    selectedTowards:string;
    exitLocation:string;
    vehicleList:any;
    tollData:any = [];
    tollCostData:any;
    RouteId:any;
    vechileNo = new FormControl();
    invalidVechNo = false;
    payementDetails:any = [];


    constructor(private  tollservice: TollService, private toaster: ToastController,private router: Router) { }

    ionViewWillEnter() {
        this.tollservice.getAllTollPlazas().subscribe( res => {
            console.log(res);
            this.alltollplazas = res;
            console.log(res);
        });
    }
    ngOnInit() {
        this.getTollCost();
        this.vechileNo.valueChanges.subscribe(res=>{
            if(res){
                this.invalidVechNo = false;
            }
        })
    }
    getRoute(data) {
        console.log('dataobj', data);
        localStorage.setItem('selectedFromLoc',data.detail.value);
        const routeId = this.alltollplazas.find(obj=>{
            if(obj.Id == data.detail.value){
                this.RouteId = obj.RouteId;
                return obj.RouteId
            }
        });

        this.tollservice.getToFrombyId(routeId.RouteId).subscribe(res => {
            console.log('get route', res);
            this.towords = res;
            console.log('toards', this.towords);
            this.getVehicles();
        });
    }
    selectTowords(towards,direction) {
        this.tollCostData = undefined
        console.log(towards);
        this.selectedTowards = towards;
        this.getTollPlaza(direction);
        console.log('Direction', direction);
        localStorage.setItem('toDirection',direction);

    }

    tollList:any = []
    getTollPlaza(direction){
        let tollId = localStorage.getItem('selectedFromLoc');
        console.log('TollId', tollId);
        if(direction) {
            debugger;
            this.tollList = this.alltollplazas.filter(obj=>{
                return obj.Id > tollId && this.RouteId == obj.RouteId
            })
            console.log(this.tollList)
            if(this.tollList.length == 0){
                this.exitLocation = '1';
            }

        }else {
            debugger;
            this.tollList = this.alltollplazas.filter(obj=>{
                return obj.Id < tollId && this.RouteId == obj.RouteId
            })
            console.log(this.tollList)
            if(this.tollList.length == 0){
                this.exitLocation = '1';
            }
          }
        }

    getVehicles() {
        this.tollservice.getVehicleList().subscribe( res=> {
            console.log('vehicle',res );
            this.vehicleList = res;
        });
    }

    getTollCost() {
        this.tollservice.getTollCost().subscribe( res=> {
            console.log(res);
            this.tollData = res;
        });
    }

    selectedVechileType(value){
        console.log(value);
        console.log('exit location',this.exitLocation);
        if(this.exitLocation != '1'){
            debugger;
            let tollId = localStorage.getItem('selectedFromLoc');
            this.tollData.find(obj=>{
                console.log('obje', obj);
                debugger;
                if(obj.Toll[0].Id == tollId && obj.ExitLocation[0].Id == this.exitLocation && obj.VehicleType[0].VehicleTypeId == value){
                    this.tollCostData = obj;
                    console.log('costdata', this.tollCostData);
                    return true;
                }
            })
        }else {
            this.tollData.find(obj=>{
                console.log('obje', obj);
                debugger;
                if(obj.VehicleType[0].VehicleTypeId == value){
                    this.tollCostData = obj;
                    console.log('costdata', this.tollCostData);
                    return true;
                }
            })
            // this.tollCostData = {
            //     'Cost': 50
            // }
        }
    }

    payNow() {
        console.log(this.tollCostData)
        console.log('vehicle number ', this.vechileNo.value);
        if(this.vechileNo.value) {
            this.invalidVechNo = false;
            let obj = {
                "UserId": "1",
                "ExitLocId": this.tollCostData.ExitLocation[0].Id,
                "VehicleTypeId": this.tollCostData.VehicleType[0].VehicleTypeId,
                "RouteId": this.RouteId,
                "Amount": this.tollCostData.Cost,
                "VehicleNumber":this.vechileNo.value
            }

            this.tollservice.payTollCost(obj).subscribe(res => {
                console.log('response',res);
                this.payementDetails = res;
                this.toastmsg();
                this.router.navigate(['/payement-recipt',  JSON.stringify(this.payementDetails)]);
            })
        }
    }

    async toastmsg() {
        const toast = await this.toaster.create({
            message: 'Paid Sucessfully',
            duration: 5000
        });
        toast.present();
    }


    getTollId(value){
        console.log(value)
    }
}
