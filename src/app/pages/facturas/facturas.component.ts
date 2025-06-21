import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';
import { Factura } from '../../models/Factura';
import { FacturaService } from '../../services/factura.service';
import { FormsModule } from '@angular/forms';

@Component({
    standalone: true,
    selector: 'app-facturas',
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
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

    terminoBusqueda: string = '';

    ngOnInit() {
        this.cargarFacturasDesdeAPI();
    }

    facturasFiltradas(): Factura[] {
        if (!this.terminoBusqueda.trim()) {
            return this.facturas;
        }
        const termino = this.terminoBusqueda.toLowerCase();
        return this.facturas.filter(factura => {
            const numero = factura.numeroFactura?.toLowerCase() || '';
            const cliente = factura.cliente?.nombreCliente?.toLowerCase() || '';
            return numero.includes(termino) || cliente.includes(termino);
        });
    }

    cargarFacturasDesdeAPI() {
        this.facturaService.getFacturasAPI().subscribe(
            (facturas: Factura[]) => {
                console.log('Facturas cargadas desde la API:', facturas);
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

                let fechaEmision = factura.fechaEmision;
                if (fechaEmision) {
                    fechaEmision = fechaEmision.split('T')[0];
                }

                this.editarFacturaForm.patchValue({
                    numeroFactura: factura.numeroFactura,
                    estado: factura.estado,
                    fechaEmision: fechaEmision,
                    total: factura.total,
                });

                this.mostrarModalEditar = true;
            },
            (error) => {
                console.error('Error al obtener factura para edición:', error);
            }
        );

        const mainContent = document.querySelector('.contenido-principal');
        if (mainContent) {
            mainContent.classList.add('blur-background');
            mainContent.classList.add('blur-target');
        }

        document.body.style.overflow = 'hidden';
    }

    cerrarModalEditar() {
        this.mostrarModalEditar = false;
        this.facturaEditando = null;
        this.editarFacturaForm.reset();

        const mainContent = document.querySelector('.contenido-principal');
        if (mainContent) {
            mainContent.classList.remove('blur-background');
            mainContent.classList.remove('blur-target');
        }

        document.body.style.overflow = 'hidden';
    }

    guardarCambiosFactura(id: number) {
        if (this.editarFacturaForm.valid && this.facturaEditando) {
            const formValue = this.editarFacturaForm.value;

            // Formatear fechaEmision
            let fechaEmisionISO = formValue.fechaEmision;
            if (fechaEmisionISO) {
                fechaEmisionISO = new Date(fechaEmisionISO + 'T00:00:00.000+00:00').toISOString();
                fechaEmisionISO = fechaEmisionISO.replace('Z', '+00:00');
            }

            // Formatear fechaPago si existe
            let fechaPagoISO = this.facturaEditando.fechaPago;
            if (fechaPagoISO && fechaPagoISO.length === 10) {
                fechaPagoISO = new Date(fechaPagoISO + 'T00:00:00.000+00:00').toISOString().replace('Z', '+00:00');
            } else if (fechaPagoISO) {
                fechaPagoISO = this.facturaEditando.fechaPago;
            } else {
                fechaPagoISO = undefined;
            }

            // Construir el objeto compatible con EditarFacturaDetallesDTO
            const facturaActualizada = {
                numeroFactura: formValue.numeroFactura,
                fechaEmision: fechaEmisionISO,
                fechaPago: fechaPagoISO,
                subtotal: this.facturaEditando.subtotal, // Si quieres editar, agrega al form
                iva: this.facturaEditando.iva,           // Si quieres editar, agrega al form
                total: formValue.total,
                estado: formValue.estado,     // Si quieres editar, usa formValue.estado y asegúrate que sea objeto
                facturasDetalles: this.facturaEditando.facturasDetalles,
                cliente: this.facturaEditando.cliente
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
