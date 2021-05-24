import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';


@Injectable({
    providedIn: 'root'
})

export class LoginService {

    constructor(private http: HttpClient) { }

    public login(data: Login): Observable<any> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/x-www-form-urlencoded'
            })
        };

        let body = `grant_type=${data.grant_type}&username=${data.username}&password=${data.password}`;

        return this.http.post<any>(`Token`, body, httpOptions);
    }

}