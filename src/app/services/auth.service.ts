import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/loginRequest';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private urlBase = "http://localhost:8082/autonomax";

    constructor(private http: HttpClient) { }

    login(nombreUsuario: string, password: string) {
        const body: LoginRequest = { nombreUsuario: nombreUsuario, password };
        return this.http.post(this.urlBase + "/login", body, { withCredentials: true }).pipe(
            catchError(this.handleError)
        );
    }

    logout() {
        return this.http.post(this.urlBase + "/logout", {}, { withCredentials: true }).pipe(
            tap(() => { sessionStorage.removeItem("usuarioActual") }),
            catchError(this.handleError)
        );
    }

    estaLogueado() {
        return !!sessionStorage.getItem("usuarioActual");
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = 'Error desconocido!';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`;
        } else {
            if (error.status === 401) {
                errorMessage = 'Credenciales inválidas.';
            } else if (error.status === 404) {
                errorMessage = 'Recurso no encontrado.';
            } else {
                errorMessage = `Error del servidor: ${error.status} ${error.message || ''}. ${error.error || ''}`;
            }
        }
        console.error(errorMessage);
        return throwError(() => error);
    }

    checkSession() {
        return this.http.get(this.urlBase + "/check-session", { withCredentials: true }).pipe(
            tap(() => sessionStorage.setItem("usuarioActual", "true")),
            catchError(() => {
                sessionStorage.removeItem("usuarioActual");
                return throwError(() => new Error("Sesión inválida"));
            })
        );
    }
}
