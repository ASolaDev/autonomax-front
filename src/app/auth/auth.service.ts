import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/loginRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = "http://localhost:8082/autonomax";

  constructor(private http:HttpClient) {}


  login(email:string,password:string)
  {
      // Para que SpringBoot reciba bien el email y contraseña
      const body:LoginRequest = {email,password};
      return this.http.post(this.urlBase + "/login",body, {withCredentials:true});
  }
}
