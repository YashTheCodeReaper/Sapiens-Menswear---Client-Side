import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './../services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  invalid: boolean = false;
  jwt!: string;
  responseStatus!: string;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Intitate login form
  userLoginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  // upon clicking login button
  onLogin() {
    // if the user form is valid
    if (this.userLoginForm.valid) {
      // hide the warning
      this.invalid = false;
      // send the detail to the DB
      this.apiService.loginUser(this.userLoginForm.value).subscribe(
        (response) => {
          // if the response is success, set jwt
          if (response.status == 'success') {
            this.jwt = response.token;
            this.responseStatus = 'success';
          }
          // if the response is a failure, reset the form, then show error
          else {
            this.userLoginForm.reset();
            this.invalid = true;
            return;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // if the responseStatus is success, set the browser cookie, update userData, navigate
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

  // upon clicking cancel
  onCalcel() {
    this.userService.userData = undefined;
    this.router.navigate(['/']);
  }
}
