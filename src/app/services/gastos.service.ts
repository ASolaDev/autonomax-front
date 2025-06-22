import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gastos } from '../models/Gastos';
import { GastosDTO } from '../models/GastosDTO';

@Injectable({ providedIn: 'root' })
export class GastosService {
    private urlBase = 'http://localhost:8082/autonomax';

    constructor(private http: HttpClient) { }

    /**
     * Obtiene la lista de gastos del usuario actual
     * @returns Observable con la lista de gastos
     */
    getGastosPorUsuario(): Observable<Gastos[]> {
        const usuarioActualString = sessionStorage.getItem('usuarioActual');
        let idUsuario = '';
        if (usuarioActualString) {
            const usuarioActual = JSON.parse(usuarioActualString);
            idUsuario = usuarioActual.id;
        }
        const params = { params: { idUsuario: idUsuario } };
        return this.http.get<Gastos[]>(this.urlBase + "/gastos", params);
    }

    /**
     * Obtiene la lista de gastos por proveedor
     * @param idProveedor ID del proveedor
     * @returns Observable con la lista de gastos
     */
    crearGasto(gasto: GastosDTO) {
        return this.http.post(this.urlBase + '/crear_gasto', gasto, { responseType: 'text' });
    }

    /**
     * Elimina un gasto por su ID
     * @param id ID del gasto a eliminar
     * @returns Observable con la respuesta del servidor
     */
    eliminarGasto(id: number) {
        return this.http.delete(`${this.urlBase}/borrar_gasto/${id}`, { responseType: 'text' });
    }

    /**
     * Obtiene un gasto por su ID
     * @param id ID del gasto a obtener
     * @returns Observable con el gasto
     */
    getGastoById(id: number): Observable<any> {
        return this.http.get<any>(`${this.urlBase}/gasto/${id}`);
    }

    /**
     * Actualiza un gasto por su ID
     * @param id ID del gasto a actualizar
     * @param gasto Objeto con los datos del gasto a actualizar
     * @returns Observable con la respuesta del servidor
     */
    actualizarGasto(id: number, gasto: any) {
        const usuarioActualString = sessionStorage.getItem('usuarioActual');
        let idUsuario = '';
        if (usuarioActualString) {
            const usuarioActual = JSON.parse(usuarioActualString);
            idUsuario = usuarioActual.id;
        }
        gasto.usuario = idUsuario; // Asignar el ID del usuario actual al gasto
        return this.http.put(this.urlBase + '/editar_gasto/' + id, gasto, { responseType: 'text' });
    }
}
