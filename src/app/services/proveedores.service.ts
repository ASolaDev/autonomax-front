import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proveedores } from '../models/Proveedores';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProveedoresService {
    private urlBase = "http://localhost:8082/autonomax";

    constructor(private http: HttpClient) { }

    getProveedores(): Observable<Proveedores[]> {
        return this.http.get<Proveedores[]>(this.urlBase + "/proveedores");
    }

    crearProveedor(proveedor: any) {
        return this.http.post(this.urlBase + "/crear_proveedor", proveedor, { responseType: 'text' });
    }

    eliminarProveedor(id: number) {
        return this.http.delete(`${this.urlBase}/borrar_proveedor/${id}`, { responseType: 'text' });
    }
    getProveedorById(id: number): Observable<Proveedores> {
        return this.http.get<Proveedores>(`${this.urlBase}/proveedor/${id}`);
    }

    actualizarProveedor(id: number, proveedor: Proveedores) {
        return this.http.put(this.urlBase + "/editar_proveedor/" + id, proveedor, { responseType: 'text' });
    }
}
