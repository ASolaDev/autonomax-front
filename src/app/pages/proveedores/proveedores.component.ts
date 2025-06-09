import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proveedores',
  imports: [CommonModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
  constructor(private router: Router){}

  onCrearProveedor() {
        console.log('Redirigiendo a /crear');
        this.router.navigate(['proveedores/crear']);
    }
}
