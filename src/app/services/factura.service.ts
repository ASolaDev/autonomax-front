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

    /**
     * Obtiene la lista de facturas del usuario actual
     * @returns Observable con la lista de facturas
     */
    getFacturas() {
        return this.facturas;
    }

    /**
     * Obtiene una factura por su ID
     * @param id ID de la factura a obtener
     * @returns Observable con la factura
     */
    getFactura(id: number) {
        return this.http.get<Factura>(this.urlBase + "/factura/" + id);
    }

    /**
     * Obtiene la lista de facturas del usuario actual desde la API
     * @returns Observable con la lista de facturas
     */
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

    /**
     * Obtiene la lista de facturas libres del usuario actual desde la API
     * @returns Observable con la lista de facturas libres
     */
    getFacturasLibresAPI() {
        const usuarioActualString = sessionStorage.getItem('usuarioActual');
        let idUsuario = '';
        if (usuarioActualString) {
            const usuarioActual = JSON.parse(usuarioActualString);
            idUsuario = usuarioActual.id;
        }
        const params = { params: { idUsuario: idUsuario } };
        return this.http.get<Factura[]>(this.urlBase + "/facturas/libres", params);
    }

    /**
     * Obtiene la lista de facturas pagadas del usuario actual desde la API
     * @returns Observable con la lista de facturas pagadas
     */
    agregarFactura(factura: Factura) {
        return this.http.post(this.urlBase + "/nueva_factura", factura, { responseType: 'text' });
    }

    /**
     * Obtiene la lista de facturas pagadas del usuario actual desde la API
     * @returns Observable con la lista de facturas pagadas
     */
    actualizarFactura(id: number, facturaActualizada: Factura) {
        return this.http.put(this.urlBase + "/editar_factura/" + id, facturaActualizada, { responseType: 'text' });
    }

    /**
     * Elimina una factura por su ID
     * @param idFactura ID de la factura a eliminar
     * @returns Observable con la respuesta del servidor
     */
    borrarFactura(idFactura: number) {
        return this.http.delete(this.urlBase + "/borrar_factura/" + idFactura, { responseType: 'text' });
    }
}

