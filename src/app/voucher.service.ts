import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators/map';
import { environment } from 'src/environments/environment';
import { Equipment } from './shared/models/equipment';
import { User } from './shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiURL}/api/vouchers`


  public getVoucher(id: string){
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  public getVouchers(){
    return this.http.get<any>(`${this.apiUrl}`)
  }

  public postVoucher(userid, equipid){
    var _voucher = {
      userid: userid,
      equipmentid : equipid
    }

    //added headers
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');


    try{
      return this.http.post<any>(`${this.apiUrl}`, _voucher, {headers: headers});
    }catch(error){
      console.log(error);
      return error;
    }
  }
}
