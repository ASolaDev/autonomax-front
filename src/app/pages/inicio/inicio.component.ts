import { Component, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements AfterViewInit {
    ngAfterViewInit() {
        //this.renderPieChart();
        //this.renderLineChart();
    }

    renderPieChart() {
        const ctx = document.getElementById('pieChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Activos', 'Inactivos', 'Pendientes'],
                datasets: [
                    {
                        data: [60, 25, 15],
                        backgroundColor: ['#4CAF50', '#FFC107', '#F44336']
                    }
                ]
            }
        });
    }

    renderLineChart() {
        const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                datasets: [
                    {
                        label: 'Ingresos',
                        data: [1200, 1500, 1800, 2000, 2500, 3000],
                        borderColor: '#4CAF50',
                        fill: false
                    }
                ]
            }
        });
    }
}
