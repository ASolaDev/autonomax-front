import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { GastosService } from '../../services/gastos.service'; // NUEVO
import { Factura } from '../../models/Factura';
import { Gastos } from '../../models/Gastos'; // NUEVO
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tesoreria',
    templateUrl: './tesoreria.component.html',
    styleUrls: ['./tesoreria.component.css'],
    imports: [CommonModule]
})
export class TesoreriaComponent implements OnInit {
    facturas: Factura[] = [];
    gastos: Gastos[] = []; // NUEVO
    saldoTotal: number = 0;
    ingresosMesActual: number = 0;
    gastosMesActual: number = 0; // NUEVO

    constructor(
        private facturaService: FacturaService,
        private gastosService: GastosService // NUEVO
    ) { }

    ngOnInit() {
        this.facturaService.getFacturasAPI().subscribe(facturas => {
            this.facturas = facturas;
            this.calcularTotales();
        });
        this.gastosService.getGastosPorUsuario().subscribe(gastos => {
            this.gastos = gastos;
            this.calcularTotales();
        });
    }

    calcularTotales() {
        const hoy = new Date();
        const mesActual = hoy.getMonth();
        const anioActual = hoy.getFullYear();

        this.saldoTotal =
            this.facturas.reduce((acc, f) => acc + (f.total || 0), 0) -
            this.gastos.reduce((acc, g) => acc + (g.monto || 0), 0);

        this.ingresosMesActual = this.facturas
            .filter(f => {
                const fecha = new Date(f.fechaEmision);
                return fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual;
            })
            .reduce((acc, f) => acc + (f.total || 0), 0);

        this.gastosMesActual = this.gastos
            .filter(g => {
                const fecha = new Date(g.fecha);
                return fecha.getMonth() === mesActual && fecha.getFullYear() === anioActual;
            })
            .reduce((acc, g) => acc + (g.monto || 0), 0);
    }
}
