import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from '../../services/factura.service';
import { CommonModule } from '@angular/common';
import { Factura } from '../../models/Factura';

@Component({
    standalone: true,
    selector: 'app-facturas',
    imports: [CommonModule],
    templateUrl: './facturas.component.html',
    styleUrls: ['./facturas.component.css'],
})

export class FacturasComponent implements OnInit {

    constructor(private router: Router, private facturaService: FacturaService) { }

    facturas: Factura[] = [];

    ngOnInit() {
        try {
            this.facturas = this.facturaService.getFacturas();
        } catch (error) {
            console.error('Error al cargar las facturas:', error);
        }
        this.cargarFacturasDesdeAPI();
    }



    cargarFacturasDesdeAPI() {
        this.facturaService.getFacturasAPI().subscribe((facturas: Factura[]) => {
            this.facturas = facturas;
        });
    }

    onCrearFactura() {
        const rutaCrearFactura = 'facturas/crear';
        this.router.navigate([rutaCrearFactura]);
    }
}
