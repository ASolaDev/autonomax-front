import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { DetallesComponent } from './detalles/detalles.component';
import { FacturaService } from '../../../services/factura.service';
import { DetalleFactura } from '../../../models/DetalleFactura';
import { Factura } from '../../../models/Factura';

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

    factura: Factura = {
        numero: '',
        cliente: '',
        emision: new Date().toISOString().split('T')[0],
        pago: '',
        total: '0.00',
        estado: 'Pendiente'
    };

    baseImponible = 0;
    totalIva = 0;
    totalFactura = 0;

    constructor(private facturaService: FacturaService, private router: Router) { }

    ngOnInit() { }

    generarFactura() {
        try {
            this.factura.total = this.totalFactura.toFixed(2);
            this.facturaService.agregarFactura({ ...this.factura, detalles: this.detallesFactura });
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

        this.factura.total = this.totalFactura.toFixed(2);
    }
}
