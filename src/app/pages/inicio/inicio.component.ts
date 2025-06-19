import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ClientesService } from '../../services/clientes.service';
import { Cliente } from '../../models/Cliente';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../models/Factura';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-inicio',
    imports: [CommonModule],
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements AfterViewInit {
    clientes: Cliente[] = [];
    facturas: Factura[] = [];

    constructor(
        private clientesService: ClientesService,
        private facturaService: FacturaService
    ) { }

    ngAfterViewInit() {
        this.clientesService.getClientes().subscribe(clientes => {
            this.clientes = clientes;
            this.renderPieChart();
        });

        this.facturaService.getFacturasAPI().subscribe(facturas => {
            this.facturas = facturas;
        });
    }

    renderPieChart() {
        const tipos = this.clientes.reduce((acc: { [key: string]: number }, cliente) => {
            acc[cliente.tipoCliente] = (acc[cliente.tipoCliente] || 0) + 1;
            return acc;
        }, {});

        const labels = Object.keys(tipos);
        const data = Object.values(tipos);

        const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels,
                datasets: [
                    {
                        data,
                        backgroundColor: ['#4CAF50', '#FFC107', '#F44336', '#2196F3', '#9C27B0']
                    }
                ]
            }
        });
    }

    renderLineChart() {
        const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                datasets: [
                    {
                        label: 'Ingresos',
                        data: [1200, 1500, 1800, 2000, 2500, 3000],
                        borderColor: '#4CAF50',
                        fill: false
                    }
                ]
            }
        });
    }

    get ingresosTotales(): number {
        return this.facturas.reduce((acc, factura) => acc + (Number(factura.total) || 0), 0);
    }
}
