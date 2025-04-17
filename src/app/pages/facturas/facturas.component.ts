import { Component } from '@angular/core';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent {
//sustituir por api
  facturas = [
    { estado: 'Pagado', numero: 'F001', cliente: 'Cliente A', emision: '2025-04-01', pago: '2025-04-10', total: '150€' },
    { estado: 'Pendiente', numero: 'F002', cliente: 'Cliente B', emision: '2025-04-05', pago: '-', total: '200€' },
  ];

  buscar = '';
}
