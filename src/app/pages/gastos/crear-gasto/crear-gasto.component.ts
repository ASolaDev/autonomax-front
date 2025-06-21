import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { Factura } from '../../../models/Factura';
import { FacturaService } from '../../../services/factura.service';
import { GastosService } from '../../../services/gastos.service';
import { Gastos, MetodoPago } from '../../../models/Gastos';
import { CommonModule } from '@angular/common';
import { Proveedores } from '../../../models/Proveedores';
import { ProveedoresService } from '../../../services/proveedores.service';
import { GastosDTO } from '../../../models/GastosDTO';
import { Router } from '@angular/router';

@Component({
    selector: 'app-crear-gasto',
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './crear-gasto.component.html'
})

export class CrearGastoComponent implements OnInit {

    gastoForm!: FormGroup;
    mostrarModalFacturas = false;
    facturas: Factura[] = [];
    facturaSeleccionada: Factura | null = null;
    mostrarModalProveedores = false;
    proveedores: Proveedores[] = [];
    proveedorSeleccionado: Proveedores | null = null;

    constructor(
        private fb: FormBuilder,
        private facturaService: FacturaService,
        private gastosService: GastosService,
        private proveedoresService: ProveedoresService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.gastoForm = this.fb.group({
            fecha: ['', Validators.required],
            descripcion: ['', Validators.required],
            monto: [0, [Validators.required, Validators.min(0.01)]],
            categoria: ['', Validators.required],
            metodoPago: ['', Validators.required],
            proveedor: [''],
        });
        this.cargarFacturas();
        this.cargarProveedores();
    }

    cargarFacturas() {
        this.facturaService.getFacturasAPI().subscribe({
            next: (data: Factura[]) => {
                this.facturas = data;
            },
            error: (err: any) => {
                console.error('Error al cargar facturas', err);
            }
        });
    }

    cargarProveedores() {
        this.proveedoresService.getProveedores().subscribe({
            next: (data: Proveedores[]) => {
                this.proveedores = data;
            },
            error: (err: any) => {
                console.error('Error al cargar proveedores', err);
            }
        });
    }

    toggleModalFacturas(estado: boolean) {
        this.mostrarModalFacturas = estado;
        if (estado) {
            this.facturaService.getFacturasLibresAPI().subscribe({
                next: (data: Factura[]) => {
                    this.facturas = data;
                },
                error: (err: any) => {
                    console.error('Error al cargar facturas libres', err);
                }
            });
        }
    }

    seleccionarFactura(factura: Factura) {
        this.facturaSeleccionada = factura;
        this.toggleModalFacturas(false);
    }

    toggleModalProveedores(estado: boolean) {
        this.mostrarModalProveedores = estado;
    }

    seleccionarProveedor(proveedor: Proveedores) {
        this.proveedorSeleccionado = proveedor;
        this.gastoForm.patchValue({
            proveedor: proveedor.id
        });
        // Si quieres rellenar los campos extra automáticamente:
        // (esto asume que tienes los controles en el form)
        this.gastoForm.patchValue({
            proveedor: proveedor.id,
            cif: proveedor.cifProveedor,
            correo: proveedor.emailProveedor,
            telefono: proveedor.telefonoProveedor,
            ciudad: proveedor.ciudadProveedor,
            provincia: proveedor.provinciaProveedor
        });
        console.log('Proveedor seleccionado:', this.proveedorSeleccionado);
        this.toggleModalProveedores(false);
    }

    guardarGasto() {
        if (this.gastoForm.invalid || !this.facturaSeleccionada || !this.proveedorSeleccionado) {
            this.gastoForm.markAllAsTouched();
            alert('Completa todos los campos, selecciona una factura y un proveedor.');
            return;
        }

        // Obtener el usuario actual (ajusta según tu app)
        const usuarioActualString = sessionStorage.getItem('usuarioActual');
        const usuarioId = usuarioActualString ? JSON.parse(usuarioActualString).id : null;

        const gasto: GastosDTO = {
            fecha: this.gastoForm.value.fecha,
            descripcion: this.gastoForm.value.descripcion,
            monto: this.gastoForm.value.monto,
            proveedor: this.proveedorSeleccionado.id!,
            usuario: usuarioId,
            factura: this.facturaSeleccionada.id!,
            categoria: this.gastoForm.value.categoria,
            metodoPago: this.gastoForm.value.metodoPago
        };

        this.gastosService.crearGasto(gasto).subscribe({
            next: () => {
                return this.router.navigate(['/gastos']);
            },
            error: (err) => {
                alert('Error al guardar el gasto');
                console.error(err);
            }
        });
    }
}

