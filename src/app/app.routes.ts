import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MenuComponent } from './layout/menu.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { CrearFacturaComponent } from './pages/facturas/crear-factura/crear-factura.component';
import { Page404Component } from './pages/page404/page404.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: '',
    component: MenuComponent,
    children: [
      { path: 'inicio', component: DashboardComponent },
      { path: 'facturas', component: FacturasComponent },
      { path: 'facturas/crear', component: CrearFacturaComponent },
      { path: '**', component: Page404Component },
      //   { path: 'gastos', component: GastosComponent },
      //   { path: 'estadisticas', component: EstadisticasComponent },
      //   { path: 'prevision', component: PrevisionComponent },
      //   { path: 'tesoreria', component: TesoreriaComponent },
      //   { path: 'notificaciones', component: NotificacionesComponent },
      //   { path: 'agenda', component: AgendaComponent },
      //   { path: 'exportar', component: ExportacionComponent },
    ]
  }
];
