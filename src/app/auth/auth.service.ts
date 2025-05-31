import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/loginRequest';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlBase = "http://localhost:8082/autonomax";

  constructor(private http:HttpClient) {}

  ngOnInit()
  {
     
  }

  login(nombre_usuario:string,password:string)
  {
      // Para que SpringBoot reciba bien el nombre de usuario y contraseña
      const body:LoginRequest = {nombre_usuario,password};
      return this.http.post(this.urlBase + "/login",body, {withCredentials:true});
  }

  logout()
  {
    return this.http.post(this.urlBase + "/logout",{}, {withCredentials:true}).pipe(tap(() => {sessionStorage.removeItem("usuarioActual")}))
  }


  estaLogueado()
  {
    return !!sessionStorage.getItem("usuarioActual");
  }

}
