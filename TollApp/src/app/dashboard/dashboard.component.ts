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

  constructor(private  tollservice: TollService) { }

  ionViewWillEnter() {
     this.tollservice.getAllTollPlazas().subscribe( res => {
       console.log(res);
          this.alltollplazas = res;
     })
  }
  ngOnInit() {}

    getRoute(data) {
        console.log('event fired');
        this.tollservice.getRouteByTollId(data).subscribe(res => {
            console.log('get route', res);
        })
    }

}
