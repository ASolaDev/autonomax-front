import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-cambiar-password',
    imports: [CommonModule, FormsModule],
    templateUrl: './cambiar-password.component.html'
})
export class CambiarPasswordComponent {
    visible = false;

    passActual = '';
    nuevaPass = '';

    @Output() cerrado = new EventEmitter<void>();

    abrir() {
        this.visible = true;
    }

    cerrarModal() {
        this.visible = false;
        this.cerrado.emit();
    }

    guardar() {
        this.cerrarModal();
    }
}
