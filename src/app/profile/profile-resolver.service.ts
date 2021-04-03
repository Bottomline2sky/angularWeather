import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {UserProfile} from "./UserProfile.model";
import {Observable} from "rxjs";
import {ProfileService} from "./profile.service";
import {take, tap} from "rxjs/operators";


@Injectable({providedIn: "root"})
export class ProfileResolverService implements Resolve<UserProfile>{
                userProfile: UserProfile;
               constructor(private profileService: ProfileService) {
               }
                  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<UserProfile>
                    | Promise<UserProfile>
                    | UserProfile
                  {

                    this.profileService.userProfileEmit.pipe(take(1)).
                        subscribe(res=>{
                                          this.userProfile =res;
                        })
                       if(this.userProfile == null) {
                            return this.profileService.getProfile();
                       }
                           return   this.userProfile;
                  }
}
