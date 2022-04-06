import { EventsService } from './../../services/events.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigations',
  templateUrl: './navigations.component.html',
  styleUrls: ['./navigations.component.css'],
})
export class NavigationsComponent implements OnInit {
  showProfileDropDown: boolean = false;
  profilePic!: string;
  isLogged!: boolean;
  cartCount: number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService,
    private eventsService: EventsService
  ) {
    this.eventsService.eventSubject.subscribe(() => {
      this.checkCartCount();
    });
    this.checkCartCount();
  }

  // Function to keep on updating cart counter icon
  checkCartCount() {
    if (this.userService.userData?.cart) {
      this.cartCount = 0;
      this.userService.userData.cart.forEach((cart) => {
        if (cart.count > 0) {
          this.cartCount++;
        }
      });
    }
  }

  ngOnInit(): void {
    // If there is userData after app initialization
    if (this.userService.userData) {
      // Bind the picture with this component
      this.profilePic = this.userService.userData.picture;
    }
    // Bind login status of the user
    this.isLogged = this.userService.isLogged;
    this.checkCartCount();
  }

  // Drop down menu toggler
  onProfileClick(): void {
    this.showProfileDropDown = !this.showProfileDropDown;
  }

  // Navigate to register
  onRegister() {
    this.router.navigate(['register']);
  }

  // Navigate to login
  onLogin() {
    this.router.navigate(['/login']);
  }

  // Delete the cookie, change login status, empty userData, navigate to login
  onLogout() {
    this.cookieService.delete('jwt', '/');
    this.userService.isLogged = false;
    this.userService.userData = undefined;
    this.router.navigate(['/login']);
  }
}
