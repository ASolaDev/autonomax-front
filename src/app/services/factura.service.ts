import { Injectable } from '@angular/core';
import { Factura } from '../models/Factura';

@Injectable({
    providedIn: 'root'
})

export class FacturaService {
    private facturas: Factura[] = [];

    getFacturas() {
        return this.facturas;
    }

    agregarFactura(factura: Factura) {
        this.facturas.push(factura);
    }
}
