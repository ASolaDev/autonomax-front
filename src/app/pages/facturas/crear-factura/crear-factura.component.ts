import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-factura',
  templateUrl: './crear-factura.component.html',
  styleUrls: ['./crear-factura.component.css']
})
export class CrearFacturaComponent {
  modalVisible: boolean = false;

  mostrarModal() {
    this.modalVisible = true;
  }

  ocultarModal() {
    this.modalVisible = false;
  }
}
