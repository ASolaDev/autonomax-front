import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Cliente } from '../../../models/Cliente';
import { DetalleFactura } from '../../../models/DetalleFactura';
import { Factura } from '../../../models/Factura';
import { ClientesService } from '../../../services/clientes.service';
import { FacturaService } from '../../../services/factura.service';
import { DetallesComponent } from './detalles/detalles.component';

@Component({
    selector: 'app-crear-factura',
    standalone: true,
    imports: [CommonModule, FormsModule, DetallesComponent],
    templateUrl: './crear-factura.component.html'
})

export class CrearFacturaComponent implements OnInit {

    mostrarModalDetalle = false;
    mostrarModalClientes = false;
    facturaDetalles: DetalleFactura[] = [];
    detalleEditando: DetalleFactura | null = null;
    indiceEditando: number | null = null;
    baseImponible = 0;
    totalIva = 0;
    totalFactura = 0;


    clientes: Cliente[] = [];
    clienteSeleccionado: Cliente | null = null;

    factura: Factura = {
        numeroFactura: 'F-' + Date.now(),
        idCliente: 0,
        fechaEmision: new Date().toISOString().split('T')[0],
        fechaPago: '',
        total: 0.00,
        estado: 'Pendiente',
        idUsuario: JSON.parse(sessionStorage.getItem('usuarioActual') || '{}').id || 0,
        idEmpresa: 1,
        subtotal: 0.00,
        iva: 0.00,
        cliente: {} as Cliente,
        facturasDetalles: [],
    };


    constructor(
        private facturaService: FacturaService,
        private clientesService: ClientesService,
        private router: Router
    ) { }

    ngOnInit() {
        this.cargarClientes();
    }

    cargarClientes() {
        this.clientesService.getClientes().subscribe({
            next: (data) => {
                this.clientes = data;
            },
            error: (error) => {
                console.error('Error al cargar los clientes:', error);
            }
        });
    }

    seleccionarCliente(cliente: Cliente) {
        this.clienteSeleccionado = cliente;
        this.factura.idCliente = cliente.id;
        this.toggleModalClientes(false);
    }

    generarFactura() {

        if (!this.factura.idCliente || this.factura.idCliente === 0) {
            return;
        }

        try {
            this.factura.iva = this.totalIva;
            this.factura.subtotal = this.baseImponible;
            this.factura.total = Number(this.totalFactura.toFixed(2));
            this.factura.facturasDetalles = this.facturaDetalles;

            this.facturaService.agregarFactura(this.factura).subscribe({
                next: (response) => {
                    this.router.navigate(['/facturas']);
                },
                error: (error) => {
                    console.error('Error al generar la factura:', error);
                }
            });
        } catch (error) {
            console.error('Error al generar la factura:', error);
        }
    }

    toggleModalDetalle(estado: boolean) {
        this.mostrarModalDetalle = estado;

        if (!estado) {
            this.detalleEditando = null;
            this.indiceEditando = null;
        }
    }

    toggleModalClientes(estado: boolean) {
        this.mostrarModalClientes = estado;
    }

    agregarDetalle(detalle: DetalleFactura) {
        if (this.indiceEditando !== null) {
            this.facturaDetalles[this.indiceEditando] = { ...detalle };
        } else {
            this.facturaDetalles.push({ ...detalle });
        }
        this.calcularTotales();
        this.toggleModalDetalle(false);
    }

    editarDetalle(index: number) {
        this.detalleEditando = { ...this.facturaDetalles[index] };
        this.indiceEditando = index;
        this.toggleModalDetalle(true);
    }

    eliminarDetalle(index: number) {
        this.facturaDetalles.splice(index, 1);
        this.calcularTotales();
    }

    calcularTotales() {
        const { baseImponible, totalIva } = this.facturaDetalles.reduce(
            (totales, detalle) => {
                const precioBaseItem = detalle.cantidad * detalle.precioUnitario;
                const ivaItem = precioBaseItem * (detalle.tipoIva / 100);
                detalle.subtotal = precioBaseItem + ivaItem;
                totales.baseImponible += precioBaseItem;
                totales.totalIva += ivaItem;
                return totales;
            },
            { baseImponible: 0, totalIva: 0 }
        );

        this.baseImponible = baseImponible;
        this.totalIva = totalIva;
        this.totalFactura = baseImponible + totalIva;
        this.factura.total = Number(this.totalFactura.toFixed(2));
    }
}

