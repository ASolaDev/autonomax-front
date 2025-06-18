import { Component } from '@angular/core';

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: []
})
export class AgendaComponent {

    fechaActual: Date = new Date();
    anioActual: number = this.fechaActual.getFullYear();
    mesesAnio: any[] = [];

    constructor() {
        this.generarCalendarioAnual();
    }

    generarCalendarioAnual(): void {
        this.mesesAnio = [];

        for (let i = 0; i < 12; i++) {
            const mes = i;
            const anio = this.anioActual;

            const nombreMes = new Date(anio, mes).toLocaleString('es-ES', { month: 'long' });
            const diasMes = new Date(anio, mes + 1, 0).getDate();

            const primerDia = new Date(anio, mes, 1).getDay();

            const primerDiaDelMes = primerDia === 0 ? 6 : primerDia - 1;


            const dias: number[] = Array.from({ length: diasMes }, (_, j) => j + 1);

            this.mesesAnio.push({
                nombre: nombreMes,
                dias: dias,
                primerDiaOffset: primerDiaDelMes
            });
        }
    }

    anteriorAnio(): void {
        this.anioActual--;
        this.generarCalendarioAnual();
    }

    siguienteAnio(): void {
        this.anioActual++;
        this.generarCalendarioAnual();
    }
}
