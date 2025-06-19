import { Component, OnInit } from '@angular/core';
import { FacturaService } from '../../services/factura.service';
import { Factura } from '../../models/Factura';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-tesoreria',
    templateUrl: './tesoreria.component.html',
    styleUrls: ['./tesoreria.component.css'],
    imports: [CommonModule]
})
export class TesoreriaComponent implements OnInit {
    facturas: Factura[] = [];

    constructor(private facturaService: FacturaService) { }

    ngOnInit() {
        this.facturaService.getFacturasAPI().subscribe(facturas => {
            this.facturas = facturas;
        });
    }
}
