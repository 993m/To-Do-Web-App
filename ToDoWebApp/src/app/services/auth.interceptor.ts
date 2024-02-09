import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.authService.isTokenExpired()) {
            const token = this.authService.getToken(); 

            req = req.clone({
                setHeaders: { Authorization: `Bearer ${token}`}
            });
        }
        else {
            this.authService.logout();
        }

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
              return throwError(error);
            })
          );
    }
}