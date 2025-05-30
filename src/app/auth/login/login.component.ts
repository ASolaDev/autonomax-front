import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email:string = "";
  password:string = "";
  constructor(private router: Router, private auth:AuthService) {}

  onLogin() {

    this.auth.login(this.email,this.password).subscribe(

      response =>
      {
        sessionStorage.setItem("usuarioActual", JSON.stringify(response))
        this.router.navigate(['/inicio']);
      }
      ,
      error =>
      {
        console.log("ERROR, NO VALIDO");
      }
    )
    
  }
  
}
