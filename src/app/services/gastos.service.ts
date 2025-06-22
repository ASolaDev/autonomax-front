import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gastos } from '../models/Gastos';
import { GastosDTO } from '../models/GastosDTO';

@Injectable({ providedIn: 'root' })
export class GastosService {
    private urlBase = 'http://localhost:8082/autonomax';

    constructor(private http: HttpClient) { }

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


    crearGasto(gasto: GastosDTO) {
        return this.http.post(this.urlBase + '/crear_gasto', gasto, { responseType: 'text' });
    }

    eliminarGasto(id: number) {
        return this.http.delete(`${this.urlBase}/borrar_gasto/${id}`, { responseType: 'text' });
    }

    getGastoById(id: number): Observable<any> {
        return this.http.get<any>(`${this.urlBase}/gasto/${id}`);
    }

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
