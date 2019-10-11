
import {UserVehicle} from './UserVehicle';
import {Tolls} from './Toll';


export class User {
    Id: number;
    Name: string;
    MobileNumber: string;
    VehicleObj:UserVehicle[];
    TollCost:Tolls[];

}