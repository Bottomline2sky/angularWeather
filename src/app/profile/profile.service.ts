import {Injectable} from "@angular/core";
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {UserProfile} from "./UserProfile.model";
import {map, tap} from "rxjs/operators";
import {BehaviorSubject, ReplaySubject, Subject} from "rxjs";
import {Binary} from "@angular/compiler";


@Injectable({providedIn: "root"})
export class ProfileService{
                userProfileEmit  = new  ReplaySubject<UserProfile>(1);
            constructor(private http: HttpClient) {
            }
                   updateProfile(newProfile: FormData
                   ) {
                     return this.http.post<UserProfile>('https://angularweather.herokuapp.com/profile/update', newProfile).pipe(tap(res=>{
                                 this.userProfileEmit.next(res)
                     }))
                   }

                    getProfile(){
                         return this.http.get<UserProfile>('https://angularweather.herokuapp.com/profile/get').pipe(tap(res=>{
                             this.userProfileEmit.next(res)
                      }))
                    }
                      updateImage(newImage: FormData){
                         return this.http.patch<UserProfile>('https://angularweather.herokuapp.com/profile/update/image',newImage).pipe(tap(res=>{
                                               this.userProfileEmit.next(res)
                         }))
                      }

}
