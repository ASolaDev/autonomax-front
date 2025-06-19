import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Proveedores } from '../../models/Proveedores';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
    selector: 'app-proveedores',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './proveedores.component.html',
    styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent {
    proveedores: Proveedores[] = [];
    proveedorSeleccionado: Proveedores | null = null;
    mostrarModal: boolean = false;
    editarProveedorForm: FormGroup;

    constructor(
        private router: Router,
        private proveedoresService: ProveedoresService,
        private fb: FormBuilder
    ) {
        this.editarProveedorForm = this.fb.group({
            nombreProveedor: ['', [Validators.required, Validators.minLength(3)]],
            cifProveedor: ['', [Validators.required]],
            tipoProveedor: ['', [Validators.required]],
            emailProveedor: ['', [Validators.required, Validators.email]],
            direccionProveedor: ['', [Validators.required]],
            ciudadProveedor: ['', [Validators.required]],
            provinciaProveedor: ['', [Validators.required]],
            telefonoProveedor: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.getProveedoresAPI();
    }

    onCrearProveedor() {
        console.log('Redirigiendo a /crear');
        this.router.navigate(['proveedores/crear']);
    }

    getProveedoresAPI() {
        return this.proveedoresService.getProveedores().subscribe(
            (proveedores: Proveedores[]) => {
                this.proveedores = proveedores;
            }
        );
    }

    getProveedores() {
        return this.proveedores;
    }

    eliminarProveedor(id: number) {
        this.proveedoresService.eliminarProveedor(id).subscribe(
            () => {
                console.log("FUNCIONA")
                // Recarga la lista después de eliminar
                this.getProveedoresAPI();
            },
            error => {
                console.error('Error al eliminar proveedor:', error);
            }
        );
    }

    abrirModalEditar(proveedor: Proveedores) {
        this.proveedorSeleccionado = proveedor;
        this.editarProveedorForm.patchValue(proveedor);
        this.mostrarModal = true;
    }

    cerrarModal() {
        this.mostrarModal = false;
        this.proveedorSeleccionado = null;
        this.editarProveedorForm.reset();
    }

    guardarCambios(id: number) {
        console.log('Guardando cambios para el proveedor con ID:', id);
        if (this.editarProveedorForm.valid && this.proveedorSeleccionado) {
            const proveedorActualizado = {
                ...this.proveedorSeleccionado,
                ...this.editarProveedorForm.value
            };
            this.proveedoresService.actualizarProveedor(id, proveedorActualizado).subscribe(
                response => {
                    console.log('Proveedor actualizado:', response);
                    this.cerrarModal();
                    this.getProveedoresAPI();
                },
                error => {
                    console.error('Error al actualizar el proveedor:', error);
                }
            );
        }
    }
}
