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

    /**
     * Obtiene la lista de clientes
     * @returns Observable con la lista de clientes
     */
    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(`${this.urlBase}/clientes`);
    }

    /**
     * Obtiene un cliente por su ID
     * @param id ID del cliente a obtener
     * @returns Observable con el cliente
     */
    getClienteById(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.urlBase}/cliente/${id}`);
    }

    /**
     * Crea un nuevo cliente
     * @param cliente Objeto con los datos del cliente a crear
     * @returns Observable con la respuesta del servidor
     */
    crearCliente(cliente: any) {
        return this.http.post(`${this.urlBase}/nuevo_cliente`, cliente, { responseType: 'text' });
    }

    /**
     * Actualiza un cliente por su ID
     * @param id ID del cliente a actualizar
     * @param cliente Objeto con los datos del cliente a actualizar
     * @returns Observable con la respuesta del servidor
     */
    actualizarCliente(id: number, cliente: Cliente) {
        return this.http.put(`${this.urlBase}/cliente/${id}`, cliente, { responseType: 'text' });
    }

    /**
     * Elimina un cliente por su ID
     * @param id ID del cliente a eliminar
     * @returns Observable con la respuesta del servidor
     */
    eliminarCliente(id: number) {
        return this.http.delete(`${this.urlBase}/cliente/${id}`, { responseType: 'text' });
    }

}
