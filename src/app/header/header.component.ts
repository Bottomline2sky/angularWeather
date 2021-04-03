import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../auth/auth.service";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
             isLoggedIn : boolean = false;
                subscr: Subscription ;
  constructor(private  route: Router, private authService: AuthService) { }

  ngOnInit(): void {
                  this.subscr =   this.authService.ee.subscribe((user)=>{
                        if(user) {
                          this.isLoggedIn = true;
                        }
                          else this.isLoggedIn =false;
                         console.log(user)
                  })
  }
     toLogIn(){
                      this.route.navigate(['/auth']);

  }
      toLogOut(){
           this.authService.logOut().subscribe(res=>{
                             this.isLoggedIn = false;
           });

      }
}
