import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";
import {AuthResponseModel} from "./authResponse.model";
import {subscribeOn} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
   selector: 'app-auth',
    templateUrl: './auth.component.html',
})

export class AuthComponent {
  isLoading: boolean = false;
  isLogin: boolean = false;
  error: string = null;

  constructor(private auth: AuthService, private  route: Router) {
  }


  onSubmit(f: NgForm) {
      this.isLoading = true;
    if (!f.valid) {
      this.error = "Please Fill All the Credentials";
      return
    }
    let subscr: Observable<AuthResponseModel>;
    if (!this.isLogin) {
      subscr = this.auth.signUp({email: f.value.email, password: f.value.password});
    } else {
      subscr = this.auth.logIn({email: f.value.email, password: f.value.password})
    }
    subscr.subscribe((userData) => {
      console.log(userData);
      this.route.navigate(['/home']);
    }, error => {
      this.error = error;
    })
    this.isLoading = false;
       // f.reset();
  }
    onChangeMode()
    {
      this.isLogin = !this.isLogin;
    }

}
