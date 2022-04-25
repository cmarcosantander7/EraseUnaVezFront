import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Post} from "../models/post";
import {Image} from "../models/image";

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json','Authorization':'Bearer '+JSON.parse(sessionStorage["user"]).token})

  private urlEndPoint: string = 'http://localhost:8080';

  constructor(private http: HttpClient) {
  }

  agregarimagen(image: FormData): Observable<Image> {
    return this.http.post(this.urlEndPoint + '/upload/image/', image);
  }
  getimg(id?:Number):Observable<Image>{
    return this.http.get(this.urlEndPoint+"/get/image/info/"+id).pipe(map(Response => Response as Image))
  }
}
