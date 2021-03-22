import { HttpClient, HttpHeaders } from '@angular/common/http';
import { flatten } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { _closeDialogVia } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiURL}/api/vouchers`
  private currentVoucher = '';
  private voucherSubject = new BehaviorSubject<any>(this.currentVoucher)

  public get VoucherStream(){
    return this.voucherSubject.asObservable()
  }

  public get CurrentVoucher(){
    return this.voucherSubject.value;
  }

  validateVoucher(voucher,userid: string, equipid: string){
    var _voucher = voucher;
    
    if(!_voucher || 
      !_voucher.userid ||
      !_voucher.equipmentID ||
      !_voucher.validiy){return false} //pre-detect invalid voucher
    
    var _validUser =  _voucher.userid == userid ;
    var _validEquip = _voucher.equipmentID == equipid;
    var _validDate = Date.parse(_voucher.validity) > Date.now(); 

    return _validUser && _validEquip && _validDate ;
  }

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
    return this.http.post<any>(`${this.apiUrl}`, _voucher, {headers: headers});
  }

  saveVoucher(voucher){
    this.currentVoucher = voucher
    this.voucherSubject.next(voucher)
  }
  
}
