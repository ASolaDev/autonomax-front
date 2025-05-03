import { Component } from '@angular/core';
import { DetallesComponent } from './detalles/detalles.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [DetallesComponent, CommonModule],
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent {
  mostrarModalDetalle = false;
  detallesFactura: any[] = [];
  detalleEditando: any = null;
  indiceEditando: number | null = null;

  abrirModalDetalle() {
    this.mostrarModalDetalle = true; 
  }

  cerrarModalDetalle() {
    this.mostrarModalDetalle = false;
    this.detalleEditando = null;
    this.indiceEditando = null;
  }

  agregarDetalle(detalle: any) {
    const subtotal = detalle.cantidad * detalle.precioUnitario * (1 + detalle.tipoIva / 100);
    const detalleConSubtotal = { ...detalle, subtotal };
  
    if (this.indiceEditando !== null) {
      this.detallesFactura[this.indiceEditando] = detalleConSubtotal;
    } else {
      this.detallesFactura.push(detalleConSubtotal);
    }
  
    this.cerrarModalDetalle();
  }  

  editarDetalle(index: number) {
    this.detalleEditando = { ...this.detallesFactura[index] };
    this.indiceEditando = index;
    this.abrirModalDetalle();
  }

  eliminarDetalle(index: number) {
    this.detallesFactura.splice(index, 1);
  }
}
