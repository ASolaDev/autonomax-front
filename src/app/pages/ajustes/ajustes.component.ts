import { Component, ViewChild } from '@angular/core';
import { CambiarPasswordComponent } from './cambiar-password/cambiar-password.component';

@Component({
  selector: 'app-ajustes',
  imports: [CambiarPasswordComponent],
  templateUrl: './ajustes.component.html',
  styleUrls: []
})
export class AjustesComponent {
  @ViewChild('modal') modal!: CambiarPasswordComponent;

  abrirModal() {
    this.modal.abrir();
  }

  cerrarModal() {
    console.log('Modal cerrado');
  }
}
