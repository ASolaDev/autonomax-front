import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/Cliente';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    private urlBase = "http://localhost:8082/autonomax";

    constructor(private http: HttpClient) { }


    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(`${this.urlBase}/clientes`);
    }

    getClienteById(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.urlBase}/cliente/${id}`);
    }

    crearCliente(cliente: any) {
        return this.http.post(`${this.urlBase}/nuevo_cliente`, cliente, { responseType: 'text' });
    }

    actualizarCliente(id: number, cliente: Cliente) {
        return this.http.put(`${this.urlBase}/cliente/${id}`, cliente, { responseType: 'text' });
    }

    eliminarCliente(id: number) {
        return this.http.delete(`${this.urlBase}/cliente/${id}`, { responseType: 'text' });
    }

}
