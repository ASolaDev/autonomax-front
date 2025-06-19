import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DetallesComponent } from './detalles/detalles.component';
import { FacturaService } from '../../../services/factura.service';
import { ClientesService } from '../../../services/clientes.service'; // <<-- NUEVO: Importar servicio de clientes
import { DetalleFactura } from '../../../models/DetalleFactura';
import { Factura } from '../../../models/Factura';
import { Cliente } from '../../../models/Cliente';

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
        idEmpresa: 1, // Autonomax va a ser 1 siempre (o se puede ver mejor como manejar esto)
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
                console.log('Clientes cargados:', this.clientes);
            },
            error: (error) => console.error('Error al cargar los clientes:', error)
        });
    }


    seleccionarCliente(cliente: Cliente) {
        this.clienteSeleccionado = cliente;
        this.factura.idCliente = cliente.id;
        this.toggleModalClientes(false);
        console.log('Cliente seleccionado:', this.clienteSeleccionado);
    }

    generarFactura() {
        if (!this.factura.idCliente || this.factura.idCliente === 0) {
            console.error('Error: Debes seleccionar un cliente.');
            return;
        }
        try {
            this.factura.iva = this.totalIva;
            this.factura.subtotal = this.baseImponible;
            this.factura.total = Number(this.totalFactura.toFixed(2));
            this.factura.facturasDetalles = this.facturaDetalles;
            console.log("Detalles de la factura:", this.facturaDetalles);
            console.log('Factura a generar:', this.factura);
            this.facturaService.agregarFactura(this.factura).subscribe({
                next: (respuesta) => {
                    console.log('Factura generada correctamente:', respuesta);
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

