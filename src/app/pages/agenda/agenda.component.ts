import { Component } from '@angular/core';

@Component({
    selector: 'app-agenda',
    templateUrl: './agenda.component.html',
    styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent {

    anioActual: number = new Date().getFullYear();
    mesesAnio: any[] = [];

    mostrarModal: boolean = false;
    fechaSeleccionada: Date | null = null;

    agendaDelDia: any[] = [];

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
                numeroMes: mes,
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

    abrirModal(dia: number, mes: number, anio: number): void {
        this.fechaSeleccionada = new Date(anio, mes, dia);
        this.cargarAgenda(this.fechaSeleccionada);
        this.mostrarModal = true;

        const mainContent = document.getElementById('main-calendar-content');
        if (mainContent) {
            mainContent.classList.add('blur-background');
            mainContent.classList.add('blur-target');
        }

        document.body.style.overflow = 'hidden';
    }

    cerrarModal(): void {
        this.mostrarModal = false;
        this.fechaSeleccionada = null;
        this.agendaDelDia = [];

        const mainContent = document.getElementById('main-calendar-content');
        if (mainContent) {
            mainContent.classList.remove('blur-background');
            mainContent.classList.remove('blur-target');
        }

        document.body.style.overflow = 'auto';
    }


    cargarAgenda(fecha: Date) {

        if (fecha.getDate() === 20 && fecha.getMonth() === 6 && fecha.getFullYear() === 2025) {
            this.agendaDelDia = [{ hora: '10:00', descripcion: 'Reunión de equipo' }];
        } else if (fecha.getDate() === 5 && fecha.getMonth() === 8) {
            this.agendaDelDia = [{ hora: '14:00', descripcion: 'Cita con el cliente' }, { hora: '16:00', descripcion: 'Clase de inglés' }];
        } else {
            this.agendaDelDia = [{ hora: 'Sin eventos', descripcion: '' }];
        }
    }
}
