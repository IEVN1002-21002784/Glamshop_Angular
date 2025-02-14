import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./principal/principal.component')
  },
  {
    path: 'reportes',
    loadComponent: () => import('./reportes/reporte/reporte.component')
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./reportes/configuracion/configuracion.component')
  },
  {
    path: 'generar',
    loadComponent: () => import('./reportes/generar/generar.component')
  },
  {
    path: 'graficos',
    loadComponent: () => import('./reportes/graficos/graficos.component')
  },
];


