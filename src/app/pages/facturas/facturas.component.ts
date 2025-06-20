import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { Factura } from '../../models/Factura';
import { FacturaService } from '../../services/factura.service';

@Component({
    standalone: true,
    selector: 'app-facturas',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './facturas.component.html',
    styleUrls: ['./facturas.component.css'],
})
export class FacturasComponent implements OnInit {
    constructor(
        private router: Router,
        private facturaService: FacturaService,
        private fb: FormBuilder
    ) {
        this.editarFacturaForm = this.fb.group({
            numeroFactura: ['', Validators.required],
            estado: ['', Validators.required],
            fechaEmision: ['', Validators.required],
            total: [0, [Validators.required, Validators.min(0)]],
        });
    }

    facturas: Factura[] = [];

    mostrarModalEditar = false;
    facturaEditando: Factura | null = null;
    editarFacturaForm: FormGroup;

    ngOnInit() {
        this.cargarFacturasDesdeAPI();
    }

    cargarFacturasDesdeAPI() {
        this.facturaService.getFacturasAPI().subscribe(
            (facturas: Factura[]) => {
                this.facturas = facturas;
            },
            (error) => {
                console.error('Error al cargar las facturas:', error);
            }
        );
    }

    eliminarFactura(id: number) {
        this.facturaService.borrarFactura(id).subscribe(
            () => {
                this.cargarFacturasDesdeAPI();
            },
            (error) => {
                console.error('Error al eliminar factura:', error);
            }
        );
    }

    abrirModalEditar(id: number) {
        this.facturaService.getFactura(id).subscribe(
            (factura: Factura) => {
                this.facturaEditando = factura;

                this.editarFacturaForm.patchValue({
                    numeroFactura: factura.numeroFactura,
                    estado: factura.estado,
                    fechaEmision: factura.fechaEmision,
                    total: factura.total,
                });

                this.mostrarModalEditar = true;
            },
            (error) => {
                console.error('Error al obtener factura para edición:', error);
            }
        );
    }

    cerrarModalEditar() {
        this.mostrarModalEditar = false;
        this.facturaEditando = null;
        this.editarFacturaForm.reset();
    }

    guardarCambiosFactura(id: number) {
        if (this.editarFacturaForm.valid) {
            const facturaActualizada: Factura = {
                ...this.facturaEditando,
                ...this.editarFacturaForm.value,
                id: id
            };

            this.facturaService.actualizarFactura(id, facturaActualizada).subscribe(
                () => {
                    this.cargarFacturasDesdeAPI();
                    this.cerrarModalEditar();
                },
                (error) => {
                    console.error('Error al guardar cambios de la factura:', error);
                }
            );
        } else {
            console.warn('Formulario de edición de factura inválido');
        }
    }

    descargarFacturaPDF(factura: Factura) {
        const doc = new jsPDF();
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(22);
        doc.text('Factura Detallada', 14, 20);
        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(16);
        doc.text(`Número de Factura: ${factura.numeroFactura}`, 14, 30);
        doc.text(`Estado: ${factura.estado}`, 14, 40);
        doc.text(`Fecha de Emisión: ${factura.fechaEmision}`, 14, 50);
        doc.text(`Total: ${factura.total} €`, 14, 60);

        doc.setFont('Helvetica', 'normal');
        doc.setFontSize(12);

        doc.save(`factura_${factura.numeroFactura}.pdf`);
    }

    onCrearFactura() {
        const rutaCrearFactura = 'facturas/crear';
        this.router.navigate([rutaCrearFactura]);
    }
}
