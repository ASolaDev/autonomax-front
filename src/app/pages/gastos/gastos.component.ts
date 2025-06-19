import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gastos',
    imports: [CommonModule],
    templateUrl: './gastos.component.html',
    styleUrls: ['./gastos.component.css'],
})

export class GastosComponent {
    constructor(private router: Router) { }

    onCrearGasto() {
        this.router.navigate(['gastos/crear']);
    }
}
