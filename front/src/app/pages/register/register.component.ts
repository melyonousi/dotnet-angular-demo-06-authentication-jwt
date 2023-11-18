import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/models/register.module';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  register: Register = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private authServices: AuthenticationService, private router: Router) { }

  Regitser() {
    this.authServices.Register(this.register).subscribe({
      next: () => {
        this.router.navigate(['login']);
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
