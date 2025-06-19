import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Notificacion {
    tipo: 'success' | 'error' | 'info' | 'warning';
    mensaje: string;
    id: number;
}

@Component({
    selector: 'app-notificaciones',
    templateUrl: './notificaciones.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class NotificacionesComponent {
    notificaciones: Notificacion[] = [];
    historial: Notificacion[] = [];
    private contador = 0;

    agregarNotificacion(tipo: Notificacion['tipo'], mensaje: string) {
        const id = ++this.contador;
        this.notificaciones.push({ tipo, mensaje, id });

        setTimeout(() => this.cerrarNotificacion(id), 5000);
    }

    cerrarNotificacion(id: number) {
        const noti = this.notificaciones.find(n => n.id === id);
        if (noti) {
            this.historial.unshift(noti); // Agrega al inicio del historial
        }
        this.notificaciones = this.notificaciones.filter(n => n.id !== id);
    }
}
