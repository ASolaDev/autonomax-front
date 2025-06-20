import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GastosService {
    private urlBase = 'http://localhost:8080/autonomax';

    constructor(private http: HttpClient) { }

    getGastos(): Observable<any[]> {
        return this.http.get<any[]>(this.urlBase + '/gastos');
    }

    crearGasto(gasto: any) {
        return this.http.post(this.urlBase + '/crear_gasto', gasto, { responseType: 'text' });
    }

    eliminarGasto(id: number) {
        return this.http.delete(`${this.urlBase}/borrar_gasto/${id}`, { responseType: 'text' });
    }

    getGastoById(id: number): Observable<any> {
        return this.http.get<any>(`${this.urlBase}/gasto/${id}`);
    }

    actualizarGasto(id: number, gasto: any) {
        return this.http.put(this.urlBase + '/editar_gasto/' + id, gasto, { responseType: 'text' });
    }
}
