import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {catchError, exhaustMap, take, tap} from "rxjs/operators";
import {Injectable} from "@angular/core";
@Injectable()

export class AuthInterceptorService implements HttpInterceptor{
                 constructor(private authService: AuthService) {
                 }
              intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
                      const neglected: string[] = ['https://angularweather.herokuapp.com/login', 'https://angularweather.herokuapp.com/signup' ,'https://angularweather.herokuapp.com/getWeather']
                                 if(!neglected.includes(req.url)) {
                                    return    this.authService.ee.pipe(take(1),exhaustMap(user=>{
                                      const token =  user.getToken;
                                      const modifiedReq = req.clone({
                                        headers: new HttpHeaders({
                                             'Authorization': 'Bearer '+  token
                                        })
                                      });
                                         return next.handle(modifiedReq).pipe(catchError(this.handleError),tap(res=>{
                                            console.log(res)
                                         }))
                                    }
                                    ))
                                 }
                                   return next.handle(req);
                 }

                  private  handleError(errResponse: HttpErrorResponse) {
                                      const errorMessage = "You are Unauthorized Please LogIn Again";
                                             if(errResponse.status == 400 || errResponse.status==401) {
                                                   this.authService.logOut();
                                                   return throwError(errorMessage);
                                             }
                                               return throwError("An Unknown Error Happened")
                    }
}
