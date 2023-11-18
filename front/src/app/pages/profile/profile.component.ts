import { Component, Input, OnInit } from '@angular/core';
import { Jwt } from 'src/app/enums/jwt';
import { User } from 'src/app/models/user.module';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authServices: AuthenticationService) { }

  ngOnInit(): void {
    this.GetUser()
  }

  profile: User = {
    id: '',
    email: '',
    name: '',
    phone: ''
  }

  GetUser() {
    const token = localStorage.getItem(Jwt.JWT);
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      payload = JSON.parse(payload).Id
    }
    this.authServices.User(payload).subscribe({
      next: (user: User) => {
        this.profile = user;
      },
      error: () => { }
    })
  }

  Update() {

  }
}
