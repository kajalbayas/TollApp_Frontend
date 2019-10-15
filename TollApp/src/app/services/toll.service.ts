import { Injectable } from '@angular/core';
import {API}  from '../constants/constants';
import {HttpParams} from "@angular/common/http";
import {Route} from '../models/Route';
import {UserVehicle}  from '../models/UserVehicle';
import {User} from '../models/User';
import {Tollplaza} from '../models/tollplaza';
import {Vehicle} from '../models/Vehicles';
import {Tolls}  from '../models/Toll';

import {HttpService}  from './http.service';


@Injectable({
  providedIn: 'root'
})
export class TollService {

  constructor(private http: HttpService) { }

    getAllTollPlazas() {
        const TOLLPLAZA = API.TOLLPLAZA;
        return this.http.get(TOLLPLAZA);
    }

    getToFrombyId(id) {
         const ROUTES = API.ROUTE;
         return this.http.getById(ROUTES,id);
    }

    getVehicleList(){
          const VEHICLELIST = API.VEHICLE
           return this.http.get(VEHICLELIST);
    }

    getTollCost() {
        const TOLLCOST = API.TOLLCOST
        return this.http.get(TOLLCOST);
    }

    payTollCost(data){
        const PAYTOLL = API.PAYEMENTHISTORIES;
        return this.http.post(PAYTOLL,data);
    }

    getPaymentHistory(id){
        const PAYMENTHISTORY = API.PAYEMENTHISTORIES;
        return this.http.getById(PAYMENTHISTORY,id);
    }
}
