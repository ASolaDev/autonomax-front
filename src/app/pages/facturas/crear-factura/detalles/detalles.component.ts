import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-detalles',
  standalone: true,
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent {
  @Output() cerrar = new EventEmitter<void>();

  cerrarModal() {
    this.cerrar.emit();
  }
}
