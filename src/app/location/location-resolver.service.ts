import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import { Location }  from "./location.model"
import {Observable} from "rxjs";
import {LocationService} from "./location.service";
@Injectable({providedIn: "root"})

export class LocationResolverService implements Resolve<Location[]>{
          constructor(private locationService: LocationService) {
          }
                    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
                      Observable<Location[]> | Promise<Location[]> | Location[] {
                                   const locations = this.locationService.locations;
                                          console.log(locations === null)
                                      if(locations === null) {
                                       return  this.locationService.loadLocation();
                                      }
                                        return this.locationService.getLocations();
                    }
}
