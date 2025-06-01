import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-detalles',
    standalone: true,
    templateUrl: './detalles.component.html',
    imports: [FormsModule],
})

export class DetallesComponent implements OnChanges {
    @Input() detalle: any = null;
    @Output() cerrar = new EventEmitter<void>();
    @Output() guardarDetalles = new EventEmitter<any>();

    descripcion: string = '';
    cantidad: number = 0;
    precioUnitario: number = 0;
    tipoIva: number = 0;
    subtotal: number = 0;

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['detalle'] && this.detalle) {
            this.descripcion = this.detalle.descripcion;
            this.cantidad = this.detalle.cantidad;
            this.precioUnitario = this.detalle.precioUnitario;
            this.tipoIva = this.detalle.tipoIva;
            this.calcularSubtotal();
        }
    }

    cerrarModal() {
        this.cerrar.emit();
    }

    calcularSubtotal(): void {
        if (this.cantidad && this.precioUnitario && this.tipoIva !== null) {
            const base = this.cantidad * this.precioUnitario;
            const iva = base * (this.tipoIva / 100);
            this.subtotal = +(base + iva).toFixed(2);
        } else {
            this.subtotal = 0;
        }
    }

    guardar(): void {
        this.calcularSubtotal();
        const detalle = {
            descripcion: this.descripcion,
            cantidad: this.cantidad,
            precioUnitario: this.precioUnitario,
            tipoIva: this.tipoIva,
            subtotal: this.subtotal
        };
        this.guardarDetalles.emit(detalle);
    }
}
