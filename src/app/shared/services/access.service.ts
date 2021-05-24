import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, ObservedValueOf } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AccessService{
  constructor(public http: HttpClient) {
  }
 getPrivilege() {
   return this.http.get(`api/privilege/username`).pipe(map((res: any) => res.Payload));
 }
}