import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GastosService } from '../../services/gastos.service';
import { Gastos } from '../../models/Gastos';

@Component({
    selector: 'app-gastos',
    imports: [CommonModule],
    templateUrl: './gastos.component.html',
    styleUrls: ['./gastos.component.css'],
})

export class GastosComponent {
    gastos: Gastos[] = [];
    constructor(private router: Router, private gastosService: GastosService) { }

    onCrearGasto() {
        this.router.navigate(['gastos/crear']);
    }

    ngOnInit() {
        this.getGastosApi();
    }

    getGastosApi() {
        return this.gastosService.getGastosPorUsuario().subscribe({
            next: (gastos: Gastos[]) => {
                this.gastos = gastos;
            },
            error: (error: any) => {
                console.error('Error al obtener los gastos:', error);
            }
        });
    }

    eliminarGasto(gastoId: number) {
        this.gastosService.eliminarGasto(gastoId).subscribe({
            next: () => {
                this.getGastosApi();
            },
            error: (error: any) => {
                console.error('Error al eliminar el gasto:', error);
            }
        });
    }
}
