import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { MenuComponent } from './layout/menu.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { AjustesComponent } from './pages/ajustes/ajustes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { ExportacionComponent } from './pages/exportacion/exportacion.component';
import { CrearFacturaComponent } from './pages/facturas/crear-factura/crear-factura.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { CrearGastoComponent } from './pages/gastos/crear-gasto/crear-gasto.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { Page404Component } from './pages/page404/page404.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { TesoreriaComponent } from './pages/tesoreria/tesoreria.component';
import { CrearClienteComponent } from './pages/clientes/crear-cliente/crear-cliente.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    {
        path: '',
        component: MenuComponent,
        children: [
            { path: 'inicio', component: InicioComponent },
            { path: 'clientes', component: ClientesComponent },
            { path: 'clientes/crear', component: CrearClienteComponent },
            { path: 'proveedores', component: ProveedoresComponent },
            { path: 'facturas', component: FacturasComponent },
            { path: 'facturas/crear', component: CrearFacturaComponent },
            { path: 'gastos', component: GastosComponent },
            { path: 'gastos/crear', component: CrearGastoComponent },
            { path: 'estadisticas', component: EstadisticasComponent },
            { path: 'tesoreria', component: TesoreriaComponent },
            { path: 'agenda', component: AgendaComponent },
            { path: 'exportar', component: ExportacionComponent },
            { path: 'notificaciones', component: NotificacionesComponent },
            { path: 'ajustes', component: AjustesComponent },
            { path: '**', component: Page404Component },
        ]
    }
];
