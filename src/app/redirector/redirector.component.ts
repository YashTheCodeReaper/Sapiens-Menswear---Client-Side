import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-redirector',
  templateUrl: './redirector.component.html',
  styleUrls: ['./redirector.component.css'],
})
export class RedirectorComponent implements OnInit, OnDestroy {
  countDown: number = 5;
  countDownInterval: any;

  constructor(private userService: UserService, private router: Router) {}

  // onDestroy clear the interval
  ngOnDestroy(): void {
    this.countDownInterval.clearInterval;
  }

  // manage countdown
  ngOnInit(): void {
    this.userService.validateLogin();
    this.countDownInterval = setInterval(() => {
      this.countDown--;
    }, 1000);
    setTimeout(() => {
      this.router.navigate(['/']);
      this.countDownInterval.clearInterval;
    }, 5000);
  }
}
