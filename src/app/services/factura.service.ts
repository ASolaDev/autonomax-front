import { Injectable } from '@angular/core';
import { Factura } from '../models/Factura';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class FacturaService {
    private urlBase = "http://localhost:8082/autonomax";

    private facturas: Factura[] = [];
    constructor(private http: HttpClient) { }

    getFacturas() {
        return this.facturas;
    }

    getFacturasAPI() {
        const usuarioActualString = sessionStorage.getItem('usuarioActual');
        let idUsuario = '';
        if (usuarioActualString) {
            const usuarioActual = JSON.parse(usuarioActualString);
            idUsuario = usuarioActual.id;
        }
        const params = { params: { idUsuario: idUsuario } };
        return this.http.get<Factura[]>(this.urlBase + "/facturas", params);
    }


    agregarFactura(factura: Factura) {
        this.facturas.push(factura);
    }
}

