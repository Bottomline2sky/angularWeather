import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {WeatherModel} from "./weather.model";
import {AuxWeatherModel} from "./auxWeather.model";


@Injectable()
export class WeatherService {
         // weather: WeatherModel;
  // private http: HttpClient,private params: HttpParams
     constructor(private http: HttpClient) {
     }
            fetchWeather(location: string) {
                return this.http.get<WeatherModel>('https://angularweather.herokuapp.com/getWeather',{
                             params : new HttpParams().set('search',location)
                 })
            }
              fetchWeatherAdvanced(lat: string, lon: string) {


                           return this.http.get<AuxWeatherModel>('https://angularweather.herokuapp.com/getWeatherbyLocation',{
                                     params: new HttpParams().set('lat',lat).set('lon',lon)
                           })
              }
}
