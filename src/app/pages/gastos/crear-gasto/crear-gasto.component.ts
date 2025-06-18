import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
    selector: 'app-crear-gasto',
    imports: [CommonModule],
    templateUrl: './crear-gasto.component.html'
})

export class CrearGastoComponent {
    constructor(private router: Router) { }
    onVolver() {
        console.log('Redirigiendo a /gastos');
        this.router.navigate(['gastos']);
    }
}

