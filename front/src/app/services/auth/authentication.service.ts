import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtAuth } from 'src/app/models/jwt-auth.module';
import { Login } from 'src/app/models/login.module';
import { Register } from 'src/app/models/register.module';
import { User } from 'src/app/models/user.module';
import { environment } from 'src/environments/environment';


const HttpOptions = {}
headers: new HttpHeaders({
  'Content-Type': 'application/json'
})

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  Register(register: Register): Observable<Register> {
    return this.http.post<Register>(environment.apiUrl + '/authmanagement/register', register, HttpOptions)
  }

  Login(login: Login): Observable<JwtAuth> {
    return this.http.post<JwtAuth>(environment.apiUrl + '/authmanagement/login', login, HttpOptions)
  }

  User(id: string): Observable<User> {
    return this.http.get<User>(environment.apiUrl + '/user/' + id, HttpOptions)
  }
}
