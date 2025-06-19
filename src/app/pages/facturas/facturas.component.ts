import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from '../../services/factura.service';
import { CommonModule } from '@angular/common';
import { Factura } from '../../models/Factura';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importar módulos de formulario

@Component({
    standalone: true,
    selector: 'app-facturas',
    imports: [CommonModule, ReactiveFormsModule], // Asegúrate de incluir ReactiveFormsModule
    templateUrl: './facturas.component.html',
    styleUrls: ['./facturas.component.css'],
})
export class FacturasComponent implements OnInit {
    constructor(
        private router: Router,
        private facturaService: FacturaService,
        private fb: FormBuilder // Inyectar FormBuilder
    ) {
        // Inicializar el formulario en el constructor
        this.editarFacturaForm = this.fb.group({
            numeroFactura: ['', Validators.required],
            estado: ['', Validators.required],
            fechaEmision: ['', Validators.required],
            total: [0, [Validators.required, Validators.min(0)]],
            // Agrega más controles según las propiedades de tu modelo Factura
        });
    }

    facturas: Factura[] = [];

    // Propiedades para el modal de edición
    mostrarModalEditar = false;
    facturaEditando: Factura | null = null;
    editarFacturaForm: FormGroup; // Declara el FormGroup

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
                this.cargarFacturasDesdeAPI(); // Recarga la lista después de eliminar
            },
            (error) => {
                console.error('Error al eliminar factura:', error);
            }
        );
    }

    // Este método ahora también se encargará de abrir el modal
    abrirModalEditar(id: number) {
        this.facturaService.getFactura(id).subscribe(
            (factura: Factura) => {
                this.facturaEditando = factura;
                // Rellenar el formulario con los datos de la factura
                this.editarFacturaForm.patchValue({
                    numeroFactura: factura.numeroFactura,
                    estado: factura.estado,
                    fechaEmision: factura.fechaEmision, // Asegúrate de que este formato sea compatible con input type="date"
                    total: factura.total,
                    // Rellena el resto de campos según tu modelo Factura
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
        this.editarFacturaForm.reset(); // Opcional: Limpiar el formulario al cerrar
    }

    guardarCambiosFactura(id: number) {
        if (this.editarFacturaForm.valid) {
            const facturaActualizada: Factura = {
                ...this.facturaEditando, // Mantiene las propiedades existentes de la factura
                ...this.editarFacturaForm.value, // Sobrescribe con los valores del formulario
                id: id // Asegura que el ID se mantenga
            };

            this.facturaService.actualizarFactura(id, facturaActualizada).subscribe(
                () => {
                    console.log('Factura actualizada con éxito');
                    this.cargarFacturasDesdeAPI(); // Recarga la lista
                    this.cerrarModalEditar(); // Cierra el modal
                },
                (error) => {
                    console.error('Error al guardar cambios de la factura:', error);
                }
            );
        } else {
            console.warn('Formulario de edición de factura inválido');
            // Puedes añadir lógica para mostrar mensajes de error al usuario aquí
        }
    }

    onCrearFactura() {
        const rutaCrearFactura = 'facturas/crear';
        this.router.navigate([rutaCrearFactura]);
    }
}
