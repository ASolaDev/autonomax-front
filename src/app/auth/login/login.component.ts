import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {

    nombreUsuario: string = "";
    password: string = "";

    // Errores de validación
    nombreUsuarioError: string = "";
    passwordError: string = "";
    generalError: string = "";

    constructor(private router: Router, private auth: AuthService) { }

    ngOnInit(): void {
        if (this.auth.estaLogueado()) {
            this.router.navigate(['/inicio'])
        }
    }

    onLogin() {
        if (this.nombreUsuario.trim().length <= 0 || this.password.trim().length <= 0) {
            this.nombreUsuarioError = "";
            this.passwordError = "";
            this.generalError = "Rellena todos los campos";
        } else {
            console.log(this.nombreUsuario + this.password)
            this.generalError = "";
            this.auth.login(this.nombreUsuario, this.password).subscribe(
                response => {
                    sessionStorage.setItem("usuarioActual", JSON.stringify(response))
                    this.router.navigate(['/inicio']);
                }
                ,
                error => {
                    if (error.error == "Contraseña incorrecta.") {
                        this.nombreUsuarioError = "";
                        this.passwordError = error.error;
                    } else {
                        this.passwordError = "";
                        this.nombreUsuarioError = error.error;
                    }
                }
            )
        }

    }

}
