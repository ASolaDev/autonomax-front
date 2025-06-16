import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Proveedores } from '../../models/Proveedores';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
  selector: 'app-proveedores',
  imports: [CommonModule],
  templateUrl: './proveedores.component.html',
  styleUrl: './proveedores.component.css'
})
export class ProveedoresComponent {
    private proveedores:Proveedores[] = [];
  constructor(private router: Router, private proveedoresService:ProveedoresService){}

  ngOnInit(){
    this.getProveedoresAPI();
  }
  onCrearProveedor() {
        console.log('Redirigiendo a /crear');
        this.router.navigate(['proveedores/crear']);
    }

  getProveedoresAPI(){
    return this.proveedoresService.getProveedores().subscribe(
        (proveedores: Proveedores[]) => {
      this.proveedores = proveedores;
    }
    )
  }

  getProveedores(){
    return this.proveedores;
  }
}
