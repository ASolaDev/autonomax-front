import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cambiar-password',
  imports: [CommonModule, FormsModule],
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css'],
})
export class CambiarPasswordComponent {
  visible = false;

  contraseñaActual = '';
  nuevaContraseña = '';

  // Evento para avisar que se cierra el modal
  @Output() cerrado = new EventEmitter<void>();

  // Método para abrir el modal (llámalo desde el padre)
  abrir() {
    this.visible = true;
  }

  cerrarModal() {
    this.visible = false;
    this.cerrado.emit();
  }

  guardar() {
    // Aquí valida y procesa la contraseña
    console.log('Contraseña actual:', this.contraseñaActual);
    console.log('Nueva contraseña:', this.nuevaContraseña);

    // Por ahora solo cerramos
    this.cerrarModal();
  }
}
