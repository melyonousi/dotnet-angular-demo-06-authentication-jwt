import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Jwt } from "../enums/jwt";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem(Jwt.JWT)
        if (token) {
            req = req.clone({
                setHeaders: { Authorization: 'Bearer ' + token }
            })
        }

        return next.handle(req)
    }

}