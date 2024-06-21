import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistrarIncidenciaComponent } from './pages/registrar-incidencia/registrar-incidencia.component';
import { RegistrarDiagnosticoComponent } from './pages/registrar-diagnostico/registrar-diagnostico.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registrar-incidencia',
    component: RegistrarIncidenciaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'registrar-diagnostico',
    component: RegistrarDiagnosticoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
