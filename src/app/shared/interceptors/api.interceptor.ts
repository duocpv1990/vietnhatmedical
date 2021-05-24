import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

//service
import { HandleErrorService } from '../services/handle-error.service';
import { environment } from 'src/environments/environment';

@Injectable()

export class APIInterceptor implements HttpInterceptor {

  constructor(public handleErrorService: HandleErrorService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem('access_token');
    const request = req.clone({

      url: `${environment.API_URL}/${req.url}`,
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return next.handle(request).pipe(catchError(this.handleErrorService.handleError));

  }

}
