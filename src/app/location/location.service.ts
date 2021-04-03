import {Injectable, OnInit} from "@angular/core";
import {WeatherService} from "../home/weather.service";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs/operators";
import {Subject} from "rxjs";
 interface  LocationInterface {
                  location: string,
                  latitude: string,
                  longitude: string
 }
@Injectable({providedIn: "root"})
  export class  LocationService implements OnInit{
         locations: LocationInterface[] = null;
           locationUpdate = new Subject<LocationInterface[]>();
       constructor(private http: HttpClient) {
       }
           ngOnInit() {

           }
             loadLocation() {
               return this.http.get<LocationInterface[]>('https://angularweather.herokuapp.com/getLocations').pipe(tap(res=>{
                           this.locations = res;
               }));
             }

            addLocation(location: LocationInterface){
                         return  this.http.post<LocationInterface[]>('https://angularweather.herokuapp.com/addLocation',location).subscribe((res)=>{
                                  this.locations = res;
                           })
            }

              getLocations() {
            const locations = [...this.locations];
                               return locations;
              }

}
