import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoriaGastos } from '../models/CategoriaGastos';

@Injectable({
    providedIn: 'root'
})
export class CategoriaGastosService {

    constructor(private http: HttpClient) { }

    private urlBase = "http://localhost:8082/autonomax";

    /**
     * Obtiene la lista de categorías de gastos
     * @returns Observable con la lista de categorías de gastos
     */
    getCategoriasGastos() {
        return this.http.get<CategoriaGastos[]>(`${this.urlBase}/categorias`);
    }

}
