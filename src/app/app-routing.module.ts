// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrarIncidenciaComponent } from './pages/registrar-incidencia/registrar-incidencia.component';
import { RegistrarDiagnosticoComponent } from './pages/registrar-diagnostico/registrar-diagnostico.component';
import { AuthComponent } from './pages/auth/auth.component';
import { RegistroUsuariosComponent } from './pages/registro-usuarios/registro-usuarios.component';
import { AsignacionIncidenciaComponent } from './pages/asignacion-incidencia/asignacion-incidencia.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: 'registrar-incidencia',
    loadChildren: () => import('./pages/registrar-incidencia/registrar-incidencia.component').then(m => m.RegistrarIncidenciaComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'registrar-diagnostico',
    component: RegistrarDiagnosticoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registro-usuarios',
    component: RegistroUsuariosComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'asignacion-incidencia',
    component: AsignacionIncidenciaComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
