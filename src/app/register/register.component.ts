import { UserService } from './../services/user.service';
import { ApiService } from './../services/api.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  invalid: boolean = false;
  jwt!: string;
  responseStatus!: string;

  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  userRegistrationForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    doorno: new FormControl('', Validators.required),
    locality: new FormControl('', Validators.required),
    district: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    picture: new FormControl(
      'https://www.kindpng.com/picc/b/645-6457649_png-portrait.png'
    ),
  });

  // upon register button pressed
  onRegister() {
    // if the user frorm is valid
    if (this.userRegistrationForm.valid) {
      // hide error
      this.invalid = false;
      // register the user in the DB
      this.apiService.registerUser(this.userRegistrationForm.value).subscribe(
        (response: any) => {
          // upon successfull response, set jwt
          if (response.status == 'success') {
            this.jwt = response.token;
            this.responseStatus = 'success';
          }
          // upon bad response, show error, reset the form
          else {
            this.invalid = true;
            this.userRegistrationForm.reset();
            return;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // if the response is success, set jwt to browser cookie, update userData, navigate
          if (this.responseStatus == 'success') {
            this.cookieService.set('jwt', this.jwt, 1);
            this.userService.validateLogin();
            this.router.navigate(['/redirect']);
          } else {
            return;
          }
        }
      );
    } else {
      // show error
      this.invalid = true;
    }
  }

  // upon cancel pressed, navigate to homepage
  onCalcel() {
    this.router.navigate(['/']);
  }
}
