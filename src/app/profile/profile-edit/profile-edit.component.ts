import {Component, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {WeatherService} from "../../home/weather.service";
import {ProfileService} from "../profile.service";
import {EventEmitter} from "@angular/core";
import {UserProfile} from "../UserProfile.model";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
      isUploadOption: boolean = false;
    isChecking: boolean = false;
     imagePreview:string | ArrayBuffer | SafeResourceUrl;
          limitMessage: string = null;
        updateForm: FormGroup;
          isImageSaving: boolean = false;
            isSaving:boolean= false;
             @Input()   currentProfile: UserProfile;
                  @Output() gb = new EventEmitter<void>();
  constructor(private weatherService: WeatherService, private profileService: ProfileService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
      const hProfile = this.currentProfile;
        this.updateForm = new FormGroup({
                        'name': new FormControl(hProfile.name,[Validators.required]) ,
                         'add' : new FormControl(hProfile.add,[Validators.required]),
                         'lat': new FormControl(hProfile.lat,[Validators.required]),
                          'lon': new FormControl(hProfile.lon,[Validators.required]),
                           'image': new FormControl(null)
        })
      if(this.currentProfile.image!=null)  this.imagePreview =  this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.currentProfile.image}`)
  }

     onImagePicked(event: Event){
                    const file = (event.target as HTMLInputElement).files[0];
                      this.updateForm.patchValue({image: file});
                        this.updateForm.get('image').updateValueAndValidity();
                    const   reader  = new FileReader();
                       reader.onload = ()=>{
                           this.imagePreview = reader.result;
                       }
                        reader.readAsDataURL(file);
                            this.isUploadOption = true;
                                 console.log(file)
                    console.log(this.updateForm.controls)
     }

              checkCoor(){
                    this.isChecking = true;
              this.weatherService.fetchWeather(this.updateForm.controls.add.value).subscribe(res=>{
                            this.updateForm.patchValue({lon: res.longitude,lat: res.latitude});
                              this.isChecking =false;
              },error => {
                          if(error === "Unable to geoCode"){
                               this.limitMessage = "Sorry Could not Fetch Enter Manually";
                          };

               })
              }
         onSubmit(){
                     const response = this.updateForm.controls;
                               const userData = new FormData();
                                  userData.append("name", response.name.value);
                                   userData.append("add",response.add.value);
                                    userData.append("lat",response.lat.value);
                                     userData.append("lon",response.lon.value);

                                     this.isSaving =true;

                       this.profileService.updateProfile(userData).subscribe(res=> {
                         this.isSaving =false
                       })

              }

              goBack(){
                         if(!this.isSaving) {
                                    this.gb.emit();
                         }

              }
               onUploadImage(){
                 this.isImageSaving = true;
                 const response1 = this.updateForm.controls;
                       const imageResponse = new FormData();
                         imageResponse.append("image",response1.image.value)
                   console.log(imageResponse)
                         this.profileService.updateImage(imageResponse).subscribe(res=>{

                                        this.isImageSaving =false;
                         })
               }

}



