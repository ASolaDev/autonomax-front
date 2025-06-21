import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Proveedores } from '../../models/Proveedores';
import { ProveedoresService } from '../../services/proveedores.service';

@Component({
    selector: 'app-proveedores',
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './proveedores.component.html',
    styleUrls: ['./proveedores.component.css']
})

export class ProveedoresComponent {
    proveedores: Proveedores[] = [];
    patron: string = '';
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
        this.router.navigate(['proveedores/crear']);
    }

    getProveedoresAPI() {
        return this.proveedoresService.getProveedores().subscribe(
            (proveedores: Proveedores[]) => {
                this.proveedores = proveedores;
            }
        );
    }

    proveedoresFiltrados(): Proveedores[] {
        if (!this.patron.trim()) {
            return this.proveedores;
        }
        const term = this.patron.toLowerCase();
        return this.proveedores.filter(p =>
            p.nombreProveedor?.toLowerCase().includes(term) ||
            p.emailProveedor?.toLowerCase().includes(term) ||
            p.telefonoProveedor?.toLowerCase().includes(term) ||
            p.ciudadProveedor?.toLowerCase().includes(term) ||
            p.provinciaProveedor?.toLowerCase().includes(term)
        );
    }

    eliminarProveedor(id: number) {
        this.proveedoresService.eliminarProveedor(id).subscribe(
            () => {
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

        const mainContent = document.querySelector('.contenido-principal');
        if (mainContent) {
            mainContent.classList.add('blur-background');
            mainContent.classList.add('blur-target');
        }

        document.body.style.overflow = 'auto';
    }

    cerrarModal() {
        this.mostrarModal = false;
        this.proveedorSeleccionado = null;
        this.editarProveedorForm.reset();

        const mainContent = document.querySelector('.contenido-principal');
        if (mainContent) {
            mainContent.classList.remove('blur-background');
            mainContent.classList.remove('blur-target');
        }

        document.body.style.overflow = 'auto';
    }

    guardarCambios(id: number) {
        if (this.editarProveedorForm.valid && this.proveedorSeleccionado) {
            const proveedorActualizado = {
                ...this.proveedorSeleccionado,
                ...this.editarProveedorForm.value
            };
            this.proveedoresService.actualizarProveedor(id, proveedorActualizado).subscribe(
                response => {
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
