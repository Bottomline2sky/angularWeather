import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {NgModule} from "@angular/core";
import {LocationComponent} from "./location/location.component";
import {LocationResolverService} from "./location/location-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuardService} from "./auth/auth-guard.service";
import {ProfileComponent} from "./profile/profile.component";
import {ProfileResolverService} from "./profile/profile-resolver.service";

const routes: Routes = [
  {path: '' , redirectTo: '/home' , pathMatch: 'full'},
  {path: 'home',component: HomeComponent},
  {path: 'locations', canActivate:[AuthGuardService],component: LocationComponent, resolve: [LocationResolverService]},
  {path: 'auth',component: AuthComponent},
  {path: 'profile',canActivate:[AuthGuardService],component: ProfileComponent,resolve:[ProfileResolverService]}
]

@NgModule({
 imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}
