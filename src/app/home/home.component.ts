import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {WeatherService} from "./weather.service";
import {WeatherModel} from "./weather.model";
import {LocationService} from "../location/location.service";
import {ActivatedRoute, Params} from "@angular/router";
import {take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
     weather: WeatherModel= null;
      isResponse: boolean= false;
       isLoading: boolean  = false;
        isAuthenticate: boolean = false;
  constructor(private weatherService: WeatherService , private locationService: LocationService,
              private activatedRoute: ActivatedRoute
    ,private authService: AuthService) {

  }

  ngOnInit(): void {
           this.activatedRoute.queryParams.subscribe((queryParams: Params)=>{
                     if(queryParams['location']!=null && queryParams['lon'] != null && queryParams['lat']!=null) {
                       this.isLoading = true;
                       const lon = queryParams['lon'];
                       const lat = queryParams['lat'];
                       const location = queryParams['location']
                         console.log(location)
                       this.weatherService.fetchWeatherAdvanced(lat, lon).subscribe(
                         (weather) => {
                             console.log(weather)
                           this.weather = {
                             location: location,
                             weather: weather,
                             latitude: lat,
                             longitude: lon
                           }
                           this.isResponse = true;
                           this.isLoading = false;
                         }
                       );
                     }
           })
  }
      onSubmit(f: NgForm) {
     this.isLoading = true;
       this.getWeather(f.value.location);
               f.reset();
      }

         getWeather(location: string){
             this.authService.ee.pipe(take(1)).subscribe(user=>{
                  if( !user) {
                    this.weatherService.fetchWeather(location).subscribe((weather)=>{
                      console.log(weather);
                      this.weather = weather
                      this.isResponse =true;
                      this.isLoading = false;
                    })
                       return
                  }
               this.weatherService.fetchWeather(location).pipe(tap(weather=>{
                 this.locationService.addLocation(weather);
               })).subscribe((weather)=>{
                 console.log(weather);
                 this.weather = weather
                 this.isResponse =true;
                 this.isLoading = false;
               })
             })}
}
