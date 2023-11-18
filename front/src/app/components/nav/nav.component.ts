import { Component } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { authGuard } from 'src/app/guards/auth.guard';
import { AuthenticationInterceptor } from 'src/app/services/interceptor';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  authGuard: CanActivateFn = authGuard
}
