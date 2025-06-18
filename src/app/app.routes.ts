import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { MenuComponent } from './layout/menu.component';
import { AgendaComponent } from './pages/agenda/agenda.component';
import { AjustesComponent } from './pages/ajustes/ajustes.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { CrearClienteComponent } from './pages/clientes/crear-cliente/crear-cliente.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { ExportacionComponent } from './pages/exportacion/exportacion.component';
import { CrearFacturaComponent } from './pages/facturas/crear-factura/crear-factura.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { CrearGastoComponent } from './pages/gastos/crear-gasto/crear-gasto.component';
import { GastosComponent } from './pages/gastos/gastos.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NotificacionesComponent } from './pages/notificaciones/notificaciones.component';
import { Page404Component } from './pages/page404/page404.component';
import { CrearProveedorComponent } from './pages/proveedores/crear-proveedor/crear-proveedor.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { TesoreriaComponent } from './pages/tesoreria/tesoreria.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },

    {
        path: '',
        component: MenuComponent,
        children: [
            { path: 'inicio', component: InicioComponent, canActivate: [AuthGuard] },
            { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
            { path: 'clientes/crear', component: CrearClienteComponent, canActivate: [AuthGuard] },
            { path: 'proveedores', component: ProveedoresComponent, canActivate: [AuthGuard] },
            { path: 'proveedores/crear', component: CrearProveedorComponent, canActivate: [AuthGuard] },
            { path: 'facturas', component: FacturasComponent, canActivate: [AuthGuard] },
            { path: 'facturas/crear', component: CrearFacturaComponent, canActivate: [AuthGuard] },
            { path: 'gastos', component: GastosComponent, canActivate: [AuthGuard] },
            { path: 'gastos/crear', component: CrearGastoComponent, canActivate: [AuthGuard] },
            { path: 'estadisticas', component: EstadisticasComponent, canActivate: [AuthGuard] },
            { path: 'tesoreria', component: TesoreriaComponent, canActivate: [AuthGuard] },
            { path: 'agenda', component: AgendaComponent, canActivate: [AuthGuard] },
            { path: 'exportar', component: ExportacionComponent, canActivate: [AuthGuard] },
            { path: 'notificaciones', component: NotificacionesComponent, canActivate: [AuthGuard] },
            { path: 'ajustes', component: AjustesComponent, canActivate: [AuthGuard] },
            { path: '**', component: Page404Component },
        ]
    }
];
