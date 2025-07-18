import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ClientesService } from '../../services/clientes.service';
import { FacturaService } from '../../services/factura.service';
import { GastosService } from '../../services/gastos.service';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
    selector: 'app-exportacion',
    templateUrl: './exportacion.component.html',
})

export class ExportacionComponent {
    exportando = false;
    mensaje = '';

    constructor(
        private clientesService: ClientesService,
        private proveedoresService: ProveedoresService,
        private facturaService: FacturaService,
        private gastosService: GastosService
    ) { }

    exportarDatos() {
        this.exportando = true;
        this.mensaje = 'Exportando datos...';

        forkJoin({
            clientes: this.clientesService.getClientes(),
            proveedores: this.proveedoresService.getProveedores(),
            facturas: this.facturaService.getFacturasAPI(),
            gastos: this.gastosService.getGastosPorUsuario()
        }).subscribe({
            next: ({ clientes, proveedores, facturas, gastos }) => {
                const csv = this.generarCSV(clientes, proveedores, facturas, gastos);
                this.descargarCSV(csv, 'autonomax_datos.csv');
                this.exportando = false;
                this.mensaje = 'Exportación completada.';
            },
            error: () => {
                this.exportando = false;
                this.mensaje = 'Error al exportar los datos.';
            }
        });
    }

    generarCSV(clientes: any[], proveedores: any[], facturas: any[], gastos: any[]): string {
        let csv = '';

        if (clientes.length) {
            csv += 'Clientes\n';
            csv += Object.keys(clientes[0]).join(',') + '\n';
            clientes.forEach(c => {
                csv += Object.values(c).map(v => `"${v}"`).join(',') + '\n';
            });
            csv += '\n';
        }

        if (proveedores.length) {
            csv += 'Proveedores\n';
            csv += Object.keys(proveedores[0]).join(',') + '\n';
            proveedores.forEach(p => {
                csv += Object.values(p).map(v => `"${v}"`).join(',') + '\n';
            });
            csv += '\n';
        }

        if (facturas.length) {
            csv += 'Facturas\n';
            csv += Object.keys(facturas[0]).join(',') + '\n';
            facturas.forEach(f => {
                csv += Object.values(f).map(v => `"${v}"`).join(',') + '\n';
            });
            csv += '\n';
        }

        if (gastos.length) { // <-- Agrega esto
            csv += 'Gastos\n';
            csv += Object.keys(gastos[0]).join(',') + '\n';
            gastos.forEach(g => {
                csv += Object.values(g).map(v => `"${v}"`).join(',') + '\n';
            });
            csv += '\n';
        }

        return csv;
    }

    descargarCSV(csv: string, filename: string) {
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}
