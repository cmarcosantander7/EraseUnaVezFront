import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Fecha} from "../models/fecha";

@Injectable({
  providedIn: 'root'
})
export class FechaService {
  private urlEndPoint:string='https://eraseunavezz.herokuapp.com/api/fecha';

  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage['user']).token})

  constructor(private http:HttpClient) {}

  getSysdate():Observable<Fecha>{
    return this.http.get(this.urlEndPoint,{headers: this.httpHeaders}).pipe(map(
      data => data as Fecha
    ));
  }
}
