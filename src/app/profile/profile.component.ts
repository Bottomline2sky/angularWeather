import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProfileService} from "./profile.service";
import {UserProfile} from "./UserProfile.model";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  updateMode: boolean = false;
  userProfile: UserProfile;
  subs: Subscription;
   imageString: SafeResourceUrl;
   subs2 : Subscription;
  constructor(private profileService: ProfileService, private activeRoute: ActivatedRoute,
               private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(res => {
    })
    this.subs = this.profileService.userProfileEmit.subscribe(res => {
        if(res.image != null) this.imageString = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${res.image}`)
      this.userProfile = res;
       this.updateMode =  false;
    })
  }

  toUpdateMode() {
    this.updateMode = true;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

       destroyEdit(){
              this.updateMode = false;
       }
}



