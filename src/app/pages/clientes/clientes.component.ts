import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../../models/Cliente';
import { ClientesService } from '../../services/clientes.service';


@Component({
    selector: 'app-clientes',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './clientes.component.html'
})

export class ClientesComponent {
    clientes: Cliente[] = [];
    clienteSeleccionado: Cliente | null = null;
    mostrarModal: boolean = false;
    editarClientesForm: FormGroup;

    constructor(
        private router: Router,
        private clientesService: ClientesService,
        private fb: FormBuilder
    ) {
        this.editarClientesForm = this.fb.group({
            nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
            cifCliente: ['', [Validators.required]],
            tipoCliente: ['', [Validators.required]],
            emailCliente: ['', [Validators.required, Validators.email]],
            direccionCliente: ['', [Validators.required]],
            ciudadCliente: ['', [Validators.required]],
            provinciaCliente: ['', [Validators.required]],
            telefonoCliente: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.getClientesAPI();
    }

    onCrearCliente() {
        console.log('Redirigiendo a /crear');
        this.router.navigate(['clientes/crear']);
    }

    getClientesAPI() {
        return this.clientesService.getClientes().subscribe(
            (clientes: Cliente[]) => {
                this.clientes = clientes;
            }
        );
    }

    getClientes() {
        return this.clientes;
    }

    eliminarCliente(id: number) {
        this.clientesService.eliminarCliente(id).subscribe(
            () => {
                console.log("FUNCIONA")
                // Recarga la lista después de eliminar
                this.getClientesAPI();
            },
            error => {
                console.error('Error al eliminar cliente:', error);
            }
        );
    }

    abrirModalEditar(cliente: Cliente) {
        this.clienteSeleccionado = cliente;
        this.editarClientesForm.patchValue(cliente);
        this.mostrarModal = true;
    }

    cerrarModal() {
        this.mostrarModal = false;
        this.clienteSeleccionado = null;
        this.editarClientesForm.reset();
    }

    guardarCambios(id: number) {
        console.log('Guardando cambios para el cliente con ID:', id);
        if (this.editarClientesForm.valid && this.clienteSeleccionado) {
            const clienteActualizado = {
                ...this.clienteSeleccionado,
                ...this.editarClientesForm.value
            };
            this.clientesService.actualizarCliente(id, clienteActualizado).subscribe(
                response => {
                    console.log('Cliente actualizado:', response);
                    this.cerrarModal();
                    this.getClientesAPI();
                },
                error => {
                    console.error('Error al actualizar el cliente:', error);
                }
            );
        }
    }
}
