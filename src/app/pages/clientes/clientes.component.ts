import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from '../../models/Cliente';
import { ClientesService } from '../../services/clientes.service';


@Component({
    selector: 'app-clientes',
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})

export class ClientesComponent {

    clientes: Cliente[] = [];
    clienteSeleccionado: Cliente | null = null;
    mostrarModal: boolean = false;
    editarClientesForm: FormGroup;
    terminoBusqueda: string = '';

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
        this.router.navigate(['clientes/crear']);
    }

    getClientesAPI() {
        return this.clientesService.getClientes().subscribe(
            (clientes: Cliente[]) => {
                this.clientes = clientes;
            }
        );
    }

    filtrarClientes(): Cliente[] {
        const termino = this.terminoBusqueda.trim().toLowerCase();
        if (!termino) {
            return this.clientes;
        }
        return this.clientes.filter(cliente =>
            cliente.nombreCliente.toLowerCase().includes(termino)
        );
    }

    getClientes() {
        return this.clientes;
    }

    eliminarCliente(id: number) {
        this.clientesService.eliminarCliente(id).subscribe(
            () => {
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

        const mainContent = document.querySelector('.contenido-principal');
        if (mainContent) {
            mainContent.classList.add('blur-background');
            mainContent.classList.add('blur-target');
        }

        document.body.style.overflow = 'hidden';
    }

    cerrarModal() {
        this.mostrarModal = false;
        this.clienteSeleccionado = null;
        this.editarClientesForm.reset();

        const mainContent = document.querySelector('.contenido-principal');
        if (mainContent) {
            mainContent.classList.remove('blur-background');
            mainContent.classList.remove('blur-target');
        }

        document.body.style.overflow = 'auto';
    }

    guardarCambios(id: number) {
        if (this.editarClientesForm.valid && this.clienteSeleccionado) {
            const clienteActualizado = {
                ...this.clienteSeleccionado,
                ...this.editarClientesForm.value
            };
            this.clientesService.actualizarCliente(id, clienteActualizado).subscribe(
                response => {
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
