import { Component } from '@angular/core';
import { DetallesComponent } from './detalles/detalles.component';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes/clientes.component';

@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [DetallesComponent, CommonModule, ClientesComponent],
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent {
  mostrarModalDetalle = false;
  mostrarModalClientes = false;
  detallesFactura: any[] = [];
  detalleEditando: any = null;
  indiceEditando: number | null = null;

  //propiedades
  baseImponible: number = 0;
  totalIva: number = 0;
  totalFactura: number = 0;

  
  //metodo abrir modal
  abrirModalDetalle() {
    this.mostrarModalDetalle = true;
  }

  abrirModalClientes() {
    this.mostrarModalClientes = true;
  }

  //metodo cerrar modal
  cerrarModalDetalle() {
    this.mostrarModalDetalle = false;
    this.detalleEditando = null;
    this.indiceEditando = null;
  }

  //metodo calcular totales
  calcularTotales() {
    this.baseImponible = 0;
    this.totalIva = 0;
    this.totalFactura = 0;

    this.detallesFactura.forEach(detalle => {
      const subtotal = detalle.cantidad * detalle.precioUnitario * (1 + detalle.tipoIva / 100);
      this.baseImponible += detalle.cantidad * detalle.precioUnitario;
      this.totalIva += detalle.cantidad * detalle.precioUnitario * (detalle.tipoIva / 100);
      this.totalFactura += subtotal;
    });
  }

  //metodo mostrar detalles
  agregarDetalle(detalle: any) {
    const subtotal = detalle.cantidad * detalle.precioUnitario * (1 + detalle.tipoIva / 100);
    const detalleConSubtotal = { ...detalle, subtotal };

    if (this.indiceEditando !== null) {
      this.detallesFactura[this.indiceEditando] = detalleConSubtotal;
    } else {
      this.detallesFactura.push(detalleConSubtotal);
    }

    this.calcularTotales(); //actualizar
    this.cerrarModalDetalle();
  }

  //metodo editar detalles
  editarDetalle(index: number) {
    this.detalleEditando = { ...this.detallesFactura[index] };
    this.indiceEditando = index;
    this.abrirModalDetalle();
  }

  //metodo eliminar detalles
  eliminarDetalle(index: number) {
    this.detallesFactura.splice(index, 1);
    this.calcularTotales(); //actualizar
  }

  //calcularTotales al inicio
  ngOnInit() {
    this.calcularTotales();
  }
}
