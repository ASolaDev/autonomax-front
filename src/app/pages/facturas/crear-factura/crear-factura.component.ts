import { Component } from '@angular/core';
import { DetallesComponent } from './detalles/detalles.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [DetallesComponent,CommonModule],
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent {
  mostrarModalDetalle: boolean = false;

  abrirModalDetalle() {
    this.mostrarModalDetalle = true;
  }

  cerrarModalDetalle() {
    this.mostrarModalDetalle = false;
  }

}
