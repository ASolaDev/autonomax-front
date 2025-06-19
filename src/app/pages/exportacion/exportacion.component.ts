import { Component } from '@angular/core';
import { ClientesService } from '../../services/clientes.service';
import { ProveedoresService } from '../../services/proveedores.service';
import { FacturaService } from '../../services/factura.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-exportacion',
    templateUrl: './exportacion.component.html',
    styleUrls: []
})
export class ExportacionComponent {
    exportando = false;
    mensaje = '';

    constructor(
        private clientesService: ClientesService,
        private proveedoresService: ProveedoresService,
        private facturaService: FacturaService
    ) {}

    exportarDatos() {
        this.exportando = true;
        this.mensaje = 'Exportando datos...';

        forkJoin({
            clientes: this.clientesService.getClientes(),
            proveedores: this.proveedoresService.getProveedores(),
            facturas: this.facturaService.getFacturasAPI()
        }).subscribe({
            next: ({ clientes, proveedores, facturas }) => {
                const csv = this.generarCSV(clientes, proveedores, facturas);
                this.descargarCSV(csv, 'autonomax_exportacion.csv');
                this.exportando = false;
                this.mensaje = 'Exportación completada.';
            },
            error: () => {
                this.exportando = false;
                this.mensaje = 'Error al exportar los datos.';
            }
        });
    }

    generarCSV(clientes: any[], proveedores: any[], facturas: any[]): string {
        let csv = '';

        // Clientes
        if (clientes.length) {
            csv += 'Clientes\n';
            csv += Object.keys(clientes[0]).join(',') + '\n';
            clientes.forEach(c => {
                csv += Object.values(c).map(v => `"${v}"`).join(',') + '\n';
            });
            csv += '\n';
        }

        // Proveedores
        if (proveedores.length) {
            csv += 'Proveedores\n';
            csv += Object.keys(proveedores[0]).join(',') + '\n';
            proveedores.forEach(p => {
                csv += Object.values(p).map(v => `"${v}"`).join(',') + '\n';
            });
            csv += '\n';
        }

        // Facturas
        if (facturas.length) {
            csv += 'Facturas\n';
            csv += Object.keys(facturas[0]).join(',') + '\n';
            facturas.forEach(f => {
                csv += Object.values(f).map(v => `"${v}"`).join(',') + '\n';
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
