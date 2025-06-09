import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-clientes',
    imports: [CommonModule],
    templateUrl: './clientes.component.html'
})

export class ClientesComponent {
    constructor(private router: Router){}

    onCrearCliente() {
        console.log('Redirigiendo a /crear');
        this.router.navigate(['clientes/crear']);
    }
}
