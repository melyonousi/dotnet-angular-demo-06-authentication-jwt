import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../services/auth/authentication.service';
import { Jwt } from '../enums/jwt';
import { User } from '../models/user.module';

export const authGuard: CanActivateFn = (route, state) => {
  const user = new User();
  const token = localStorage.getItem(Jwt.JWT);
  let payload;
  if (token) {
    payload = token.split(".")[1];
    payload = window.atob(payload);
    payload = JSON.parse(payload).Id
  }
  inject(AuthenticationService).User(payload).subscribe({
    next: (usr: User) => {
      user.email = usr.email
      user.name = usr.name
      user.id = usr.id
      user.phone = usr.phone
    }
  });
  return user.id == payload ? true : false;
};
