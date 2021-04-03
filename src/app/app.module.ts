import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import { LocationComponent } from './location/location.component';
import {DropdownDirectiveBetter} from "./shared/dropdownbetter.directive";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {WeatherService} from "./home/weather.service";
import {LoadSpinnerComponent} from "./shared/loader-spinner/load-spinner.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthInterceptorService} from "./shared/auth-interceptor.service";
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile/profile-edit/profile-edit.component';
import { LinearLoaderComponent } from './profile/profile-edit/linear-loader/linear-loader.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LocationComponent,
    DropdownDirectiveBetter,
    LoadSpinnerComponent,
     AuthComponent,
     ProfileComponent,
     ProfileEditComponent,
     LinearLoaderComponent,

  ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,

    ],
  providers: [WeatherService,
    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptorService,multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
