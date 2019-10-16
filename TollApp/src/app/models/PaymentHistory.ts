import {Route} from './Route';
import {Tollplaza} from './tollplaza';
import {Vehicle}  from './Vehicles';

export interface PaymentHistory {
    Id: number;
    UserId:number;
    ExitLocId:Tollplaza[];
    Routes:Route[];
    VehicleTypeId:Vehicle[];
    VehicleNumber:Vehicle[];
    Amount:number;
    TranscationId:string;
    CreatedDate: Date;
}