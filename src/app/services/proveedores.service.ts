import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedores } from '../models/Proveedores';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
    private urlBase = "http://localhost:8082/autonomax";

  constructor(private http:HttpClient) { }


  getProveedores():Observable<Proveedores[]>{
    return this.http.get<Proveedores[]>(this.urlBase + "/proveedores");
  }
}
