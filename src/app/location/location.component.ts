import { Component, OnInit } from '@angular/core';
import {LocationService} from "./location.service";
import { Location } from "./location.model";
import {HttpClient} from "@angular/common/http";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})


export class LocationComponent implements OnInit {

  subsc: Subscription;
     error: string;

  constructor(private locationService: LocationService,private activatedRoute : ActivatedRoute,private route : Router) {
  }

  isLoading: boolean = true;
  locations: Location[] = null;


  ngOnInit(): void {
             this.activatedRoute.params.subscribe(res=>{
                             this.locations = this.locationService.getLocations();
                               this.isLoading = false;
             },error => {
                    this.error = error;
             })
    }
     fwCo(lat: string,lon: string,location: string){

    this.route.navigate(['/home'],{queryParams: {lat,lon,location}})
     }
}
