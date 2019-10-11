import { Injectable } from '@angular/core';
import {API}  from '../constants/constants';
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

    getRouteByTollId(id) {
         const TOLLPLAZA = API.TOLLPLAZA;
         return this.http.getById(TOLLPLAZA,id);
    }
}
