import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userData!: User | undefined;
  isLogged: boolean = false;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService
  ) {}

  validateLogin() {
    return new Promise<any>((resolve, reject) => {
      this.apiService
        .validateUserLogin(this.cookieService.get('jwt'))
        .toPromise()
        .then((response: any) => {
          if (response.status == 'success') {
            this.isLogged = true;
            this.userData = response.data[0];
          } else {
            this.isLogged = false;
          }
          if (this.userData) {
            this.userData.cart = JSON.parse(this.userData?.cart.toString());
          }
          resolve(this.isLogged);
        })
        .catch((error) => {
          console.log(error);
          reject('User not logged');
        });
    });
  }
}
