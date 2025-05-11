import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private facturas: any[] = [];

  getFacturas() {
    return this.facturas;
  }

  agregarFactura(factura: any) {
    this.facturas.push(factura);
  }
}
