// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrarIncidenciaComponent } from './pages/registrar-incidencia/registrar-incidencia.component';
import { RegistrarDiagnosticoComponent } from './pages/registrar-diagnostico/registrar-diagnostico.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegistroUsuariosComponent } from './pages/registro-usuarios/registro-usuarios.component';
import { AsignacionIncidenciaComponent } from './pages/asignacion-incidencia/asignacion-incidencia.component';
import { FinalizarIncidenciaComponent } from './pages/finalizar-incidencia/finalizar-incidencia.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: [1, 2, 3, 4, 5] },
  },
  {
    path: 'registrar-incidencia',
    component: RegistrarIncidenciaComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: [1, 2, 3, 4, 5] },
  },
  {
    path: 'registrar-diagnostico',
    component: RegistrarDiagnosticoComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: [4] },
  },
  {
    path: 'registro-usuarios',
    component: RegistroUsuariosComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: [1] },
  },
  {
    path: 'asignacion-incidencia',
    component: AsignacionIncidenciaComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: [3] },
  },
  {
    path: 'finalizar-incidencia',
    component: FinalizarIncidenciaComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: [5] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
