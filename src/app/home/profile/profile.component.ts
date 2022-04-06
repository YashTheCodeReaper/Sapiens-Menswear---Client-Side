import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from './../../services/user.service';
import { User } from './../../interfaces/user.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userData!: User;

  constructor(
    private userService: UserService,
    private router: Router,
    private apiService: ApiService
  ) {
    if (this.userService.userData) {
      this.userData = this.userService.userData;
    }
  }

  ngOnInit(): void {}

  onSave() {
    this.apiService
      .updateUser(this.userData.id, this.userData)
      .subscribe((response) => {
        if (response.status == 'success') this.router.navigate(['/']);
      });
  }
  onCancel() {
    this.router.navigate(['/']);
  }
}
