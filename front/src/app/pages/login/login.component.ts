import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Jwt } from 'src/app/enums/jwt';
import { JwtAuth } from 'src/app/models/jwt-auth.module';
import { Login } from 'src/app/models/login.module';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  login: Login = {
    email: '',
    password: ''
  }
  jwtAuth = new JwtAuth()

  constructor(private authServices: AuthenticationService, private router: Router) { }

  Login() {
    this.authServices.Login(this.login).subscribe({
      next: (jwtAuth: JwtAuth) => {
        localStorage.setItem(Jwt.JWT, jwtAuth.token);
        this.router.navigate(['profile']);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
