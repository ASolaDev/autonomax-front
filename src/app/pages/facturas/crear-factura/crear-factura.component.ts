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
    detallesFactura: DetalleFactura[] = [];
    detalleEditando: DetalleFactura | null = null;
    indiceEditando: number | null = null;
    baseImponible = 0;
    totalIva = 0;
    totalFactura = 0;


    clientes: Cliente[] = [];
    clienteSeleccionado: Cliente | null = null;

    factura: Factura = {
        numeroFactura: '',
        idCliente: 0,
        fechaEmision: new Date().toISOString().split('T')[0],
        fechaPago: '',
        total: 0.00,
        estado: 'Pendiente',
        idUsuario: 0,
        idEmpresa: 0,
        subtotal: 0.00,
        iva: 0.00,
        facturasDetalles: [],
        cliente: {} as Cliente
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
            this.factura.total = Number(this.totalFactura.toFixed(2));
            this.facturaService.agregarFactura({ ...this.factura, facturasDetalles: this.detallesFactura });
            this.router.navigate(['/facturas']);
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
            this.detallesFactura[this.indiceEditando] = { ...detalle };
        } else {
            this.detallesFactura.push({ ...detalle });
        }
        this.calcularTotales();
        this.toggleModalDetalle(false);
    }

    editarDetalle(index: number) {
        this.detalleEditando = { ...this.detallesFactura[index] };
        this.indiceEditando = index;
        this.toggleModalDetalle(true);
    }

    eliminarDetalle(index: number) {
        this.detallesFactura.splice(index, 1);
        this.calcularTotales();
    }

    calcularTotales() {
        const { baseImponible, totalIva } = this.detallesFactura.reduce(
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

