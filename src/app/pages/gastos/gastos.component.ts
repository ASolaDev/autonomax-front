import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { CategoriaGastos } from '../../models/CategoriaGastos';
import { Gastos } from '../../models/Gastos';
import { Proveedores } from '../../models/Proveedores';
import { CategoriaGastosService } from '../../services/categoria-gastos.service';
import { GastosService } from '../../services/gastos.service';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
    selector: 'app-gastos',
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    templateUrl: './gastos.component.html',
    styleUrls: ['./gastos.component.css'],
})

export class GastosComponent {
    gastos: Gastos[] = [];
    proveedores: Proveedores[] = [];
    categorias: CategoriaGastos[] = []
    mostrarModalEditar = false;
    gastoEditando: Gastos | null = null;
    editarGastoForm: FormGroup;

    constructor(
        private router: Router,
        private gastosService: GastosService,
        private proveedoresService: ProveedoresService,
        private categoriasService: CategoriaGastosService,
        private fb: FormBuilder
    ) {
        this.editarGastoForm = this.fb.group({
            fecha: ['', Validators.required],
            monto: [0, [Validators.required, Validators.min(0)]],
            categoria: ['', Validators.required],
            proveedor: ['', Validators.required],
            metodoPago: ['', Validators.required],
        });
    }

    onCrearGasto() {
        this.router.navigate(['gastos/crear']);
    }

    ngOnInit() {
        this.getGastosApi();
    }

    getGastosApi() {
        return this.gastosService.getGastosPorUsuario().subscribe({
            next: (gastos: Gastos[]) => {
                this.gastos = gastos;
            },
            error: (error: any) => {
                console.error('Error al obtener los gastos:', error);
            }
        });
    }

    eliminarGasto(gastoId: number) {
        this.gastosService.eliminarGasto(gastoId).subscribe({
            next: () => {
                this.getGastosApi();
            },
            error: (error: any) => {
                console.error('Error al eliminar el gasto:', error);
            }
        });
    }

    exportarGastosCSV() {
        if (!this.gastos.length) return;
        const csv = this.generarCSV(this.gastos);
        this.descargarCSV(csv, 'gastos.csv');
    }

    generarCSV(gastos: any[]): string {
        let csv = '';
        csv += Object.keys(gastos[0]).join(',') + '\n';
        gastos.forEach(g => {
            csv += Object.values(g).map(v => `"${v}"`).join(',') + '\n';
        });
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

    descargarGastoPDF(gasto: Gastos) {
        const doc = new jsPDF();
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(18);
        doc.text('Detalle del Gasto', 14, 20);

        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(12);
        doc.text(`Fecha: ${gasto.fecha ? (new Date(gasto.fecha)).toLocaleDateString() : ''}`, 14, 35);
        doc.text(`Cantidad: ${gasto.monto} €`, 14, 45);
        doc.text(`Categoría: ${gasto.categoria?.categoria || ''}`, 14, 55);
        doc.text(`Proveedor: ${gasto.proveedor?.nombreProveedor || ''}`, 14, 65);
        doc.text(`Método de pago: ${gasto.metodoPago || ''}`, 14, 75);

        doc.save(`gasto_${gasto.idGasto}.pdf`);
    }

    abrirModalEditar(gasto: Gastos) {
        this.gastoEditando = gasto;
        this.getProveedoresAPI();
        this.getCategoriasAPI();
        this.editarGastoForm.patchValue({
            fecha: gasto.fecha
                ? (typeof gasto.fecha === 'string'
                    ? (gasto.fecha as string).split('T')[0]
                    : (gasto.fecha as Date).toISOString().split('T')[0])
                : '',
            monto: gasto.monto,
            categoria: gasto.categoria?.idCategoria || '',
            proveedor: gasto.proveedor?.id || '',
            metodoPago: gasto.metodoPago || ''
        });
        this.mostrarModalEditar = true;

        const mainContent = document.querySelector('.contenido-principal');
        if (mainContent) {
            mainContent.classList.add('blur-background');
            mainContent.classList.add('blur-target');
        }

        document.body.style.overflow = 'hidden';
    }

    cerrarModalEditar() {
        this.mostrarModalEditar = false;
        this.gastoEditando = null;
        this.editarGastoForm.reset();

        const mainContent = document.querySelector('.contenido-principal');
        if (mainContent) {
            mainContent.classList.remove('blur-background');
            mainContent.classList.remove('blur-target');
        }

        document.body.style.overflow = '';
    }

    guardarCambiosGasto(id: number) {
        if (this.editarGastoForm.valid && this.gastoEditando) {
            const formValue = this.editarGastoForm.value;

            let proveedorId = formValue.proveedor ? Number(formValue.proveedor) : null;
            let categoriaId = formValue.categoria ? Number(formValue.categoria) : null;

            const { idGasto, ...restoGasto } = this.gastoEditando;

            const gastoActualizado = {
                ...restoGasto,
                fecha: formValue.fecha,
                monto: formValue.monto,
                categoria: categoriaId,
                proveedor: proveedorId,
                factura: this.gastoEditando.factura.id,
                metodoPago: formValue.metodoPago
            };

            console.log('Enviando al backend:', gastoActualizado);
            this.gastosService.actualizarGasto(id, gastoActualizado).subscribe(
                () => {
                    this.getGastosApi();
                    this.cerrarModalEditar();
                },
                (error) => {
                    console.error('Error al guardar cambios del gasto:', error);
                }
            );
        }
    }

    getProveedoresAPI() {
        this.proveedoresService.getProveedores().subscribe({
            next: (proveedores: Proveedores[]) => {
                this.proveedores = proveedores;
            },
            error: (error: any) => {
                console.error('Error al obtener los proveedores:', error);
            }
        });
    }

    getCategoriasAPI() {
        this.categoriasService.getCategoriasGastos().subscribe({
            next: (categorias: CategoriaGastos[]) => {
                this.categorias = categorias;
            },
            error: (error: any) => {
                console.error('Error al obtener las categorías de gastos:', error);
            }
        });
    }
}
