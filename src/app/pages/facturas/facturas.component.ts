import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FacturaService } from '../../services/factura.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-facturas',
  imports: [CommonModule],
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  constructor(private router: Router, private facturaService: FacturaService) {}

  facturas: any[] = [];

  ngOnInit() {
    this.facturas = this.facturaService.getFacturas();
  }

  onCrearFactura() {
    console.log('Redirigiendo a /crear');
    this.router.navigate(['facturas/crear']);
  }


}
