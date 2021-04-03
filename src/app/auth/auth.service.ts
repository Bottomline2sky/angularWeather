import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {AuthResponseModel} from "./authResponse.model";
import {BehaviorSubject, Subject, throwError} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {UserModel} from "./user.model";
import {newArray} from "@angular/compiler/src/util";
import {Router} from "@angular/router";
@Injectable({providedIn:"root"})





export class AuthService{
               ee = new BehaviorSubject<UserModel>(null);
              private expirationTimer: any;
     constructor(private  http: HttpClient,private route: Router) {

     }


         autoLogIn(){
               const user:{
                       _id: string,
                        email: string,
                        token: string,
                        tokenExpDate: string
               } = JSON.parse(<string>localStorage.getItem('userData'))
                  if(!user) {
                     return;
                  }
                       const newUser = new UserModel(user._id,user.email,user.token,user.tokenExpDate);
                                if(newUser.getToken) {
                                        this.ee.next(newUser)
                                }
     }

            logIn(cred:{email: string,password: string}){
                      return  this.http.post<AuthResponseModel>('https://angularweather.herokuapp.com/login',cred).pipe(catchError(this.handleError),tap(res=>{
                         this.tokenHandling(res._id,res.email,res.token,res.tokenExpDate)
                      }));
            }
               signUp(cred: {email: string,password: string}) {
                              return this.http.post<AuthResponseModel>('https://angularweather.herokuapp.com/signup',cred).pipe(
                                catchError(this.handleError),tap(res=>{
                                   this.tokenHandling(res._id,res.email,res.token,res.tokenExpDate)
                                })
                              );
               }



               private handleError(errRes: HttpErrorResponse){
                               let errorMessage = "An Unknown Error Occured";
                                 if(!errRes.status) {
                                   return  throwError(errorMessage)
                                 }
                                  switch (errRes.status) {
                                    case  409: {
                                      errorMessage = "Email is already in Use Please Register Again !!!";
                                      break;
                                    }
                                    case 400: {
                                      errorMessage ="Could Not Find Please Try Again!!!"
                                    }
                                  }
                                   return throwError(errorMessage);
     }

      private tokenHandling(_id: string,email: string,token: string, tokenExpDate: string){
                                      const newUser = new UserModel(
                                          _id,email,token,tokenExpDate
                                      )

             localStorage.setItem('userData',JSON.stringify(newUser));
                                      this.ee.next(newUser)
                      this.autoLogOut(600000);
      }

       logOut(){
      return   this.http.delete<{message: string}>('https://angularweather.herokuapp.com/logout').pipe(tap(mess=>{
        this.ee.next(null);
        this.route.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.expirationTimer) {
          clearTimeout(this.expirationTimer)
        }
        console.log("Log Out Successfully")
      }))
     }
     private autoLogOut(expiresIn: number){
         this.expirationTimer = setTimeout(()=>{
             this.logOut()
           },expiresIn)}
}
