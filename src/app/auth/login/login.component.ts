import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    generalError: string = "";
    isLoading: boolean = false;

    constructor(
        private router: Router,
        private auth: AuthService,
        private fb: FormBuilder
    ) {
        this.loginForm = this.fb.group({
            nombreUsuario: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(3)]]
        });
    }

    ngOnInit(): void {
        this.auth.checkSession().subscribe({
            next: () => {
                sessionStorage.setItem("usuarioActual", "true");
                this.router.navigate(['/inicio']);
            },
            error: () => {
                sessionStorage.removeItem("usuarioActual");
                console.log("No hay sesión activa");
            }
        });
    }

    get f() { return this.loginForm.controls; }

    onLogin() {
        this.generalError = "";
        this.isLoading = true;

        this.loginForm.markAllAsTouched();

        if (this.loginForm.invalid) {
            this.generalError = "Por favor, rellena todos los campos correctamente.";
            this.isLoading = false;
            return;
        }

        const { nombreUsuario, password } = this.loginForm.value;

        this.auth.login(nombreUsuario, password).subscribe({
            next: (response) => {
                sessionStorage.setItem("usuarioActual", JSON.stringify(response));
                this.router.navigate(['/inicio']);
                this.isLoading = false;
            },
            error: (error: HttpErrorResponse) => {
                this.isLoading = false;
                if (error.error === "Contraseña incorrecta." || error.error === "Usuario no encontrado.") {
                    this.generalError = error.error;
                } else if (error.status === 401) {
                    this.generalError = "Credenciales incorrectas.";
                } else {
                    this.generalError = "Ha ocurrido un error inesperado. Por favor, inténtalo más tarde.";
                }
                console.error("Error de autenticación:", error);
            }
        });
    }
}
