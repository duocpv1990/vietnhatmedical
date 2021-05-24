import { Injectable } from '@angular/core';

//base
import { BaseApiService } from "../../../shared/services/base.service";

//service
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//model
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PotentialLevelService extends BaseApiService<any>{

  constructor(
    public http: HttpClient
  ) {
    super(http, 'api/PotentialLevel')
   }

   updateCustomerPotential(data : any) : Observable<any>{
    return this.http.post('api/CustomerPotentialLevel', data);
  }
  
}
