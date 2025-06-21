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

    getFactura(id: number) {
        return this.http.get<Factura>(this.urlBase + "/factura/" + id);
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
        return this.http.post(this.urlBase + "/nueva_factura", factura, { responseType: 'text' });
    }

    actualizarFactura(id: number, facturaActualizada: Factura) {
        return this.http.put(this.urlBase + "/editar_factura/" + id, facturaActualizada, { responseType: 'text' });
    }

    borrarFactura(idFactura: number) {
        return this.http.delete(this.urlBase + "/borrar_factura/" + idFactura, { responseType: 'text' });
    }
}

