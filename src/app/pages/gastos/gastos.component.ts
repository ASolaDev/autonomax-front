import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gastos',
    imports: [CommonModule],
    templateUrl: './gastos.component.html'
})

export class GastosComponent {
    constructor(private router: Router) { }

    onCrearGasto() {
        console.log('Redirigiendo a /crear');
        this.router.navigate(['gastos/crear']);
    }
}
