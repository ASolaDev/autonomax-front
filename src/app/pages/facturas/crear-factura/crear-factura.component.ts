import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DetallesComponent } from './detalles/detalles.component';
import { ClientesComponent } from './clientes/clientes.component';
import { FacturaService } from '../../../services/factura.service';

@Component({
  selector: 'app-crear-factura',
  standalone: true,
  imports: [CommonModule, FormsModule, DetallesComponent, ClientesComponent],
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent implements OnInit {
  mostrarModalDetalle = false;
  mostrarModalClientes = false;

  detallesFactura: any[] = [];
  detalleEditando: any = null;
  indiceEditando: number | null = null;

  factura = {
    numero: '',
    cliente: '',
    emision: '',
    pago: '',
    total: '',
    estado: ''
  };

  baseImponible = 0;
  totalIva = 0;
  totalFactura = 0;

  constructor(
    private facturaService: FacturaService,
    private router: Router
  ) {}

  ngOnInit() {
    this.calcularTotales();
  }

  generarFactura() {
    this.factura.total = this.totalFactura.toFixed(2);
    this.facturaService.agregarFactura({ ...this.factura, detalles: this.detallesFactura });
    this.router.navigate(['/facturas']);
  }

  abrirModalDetalle() {
    this.mostrarModalDetalle = true;
  }

  cerrarModalDetalle() {
    this.mostrarModalDetalle = false;
    this.detalleEditando = null;
    this.indiceEditando = null;
  }

  abrirModalClientes() {
    this.mostrarModalClientes = true;
  }

  agregarDetalle(detalle: any) {
    const subtotal = detalle.cantidad * detalle.precioUnitario * (1 + detalle.tipoIva / 100);
    const detalleConSubtotal = { ...detalle, subtotal };

    if (this.indiceEditando !== null) {
      this.detallesFactura[this.indiceEditando] = detalleConSubtotal;
    } else {
      this.detallesFactura.push(detalleConSubtotal);
    }

    this.calcularTotales();
    this.cerrarModalDetalle();
  }

  editarDetalle(index: number) {
    this.detalleEditando = { ...this.detallesFactura[index] };
    this.indiceEditando = index;
    this.abrirModalDetalle();
  }

  eliminarDetalle(index: number) {
    this.detallesFactura.splice(index, 1);
    this.calcularTotales();
  }

  calcularTotales() {
    this.baseImponible = 0;
    this.totalIva = 0;
    this.totalFactura = 0;

    this.detallesFactura.forEach(detalle => {
      const precioBase = detalle.cantidad * detalle.precioUnitario;
      const iva = precioBase * (detalle.tipoIva / 100);
      this.baseImponible += precioBase;
      this.totalIva += iva;
      this.totalFactura += precioBase + iva;
    });
  }
}
