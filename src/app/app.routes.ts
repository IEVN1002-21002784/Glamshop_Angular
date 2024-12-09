import { Routes } from '@angular/router';

export const routes: Routes = [
    {
      path:'inicio',
      loadComponent: () => import('./principal/principal.component')
    },{
        
      path: 'sign-in',
      loadComponent:()=>import('./servicios/insesion/insesion.component')
  },
  
{
        
  path: 'plan',
  loadComponent:()=>import('./servicios/plan-g/plan-g.component')
},
{
        
  path: 'carrito',
  loadComponent:()=>import('./servicios/carrito/carrito.component')
},
{
        
  path: 'login',
  loadComponent:()=>import('./servicios/registro/registro.component')
},
{
        
  path: 'admin',
  loadComponent:()=>import('./servicios/admin/admin.component')
},
{
        
  path: 'edit',
  loadComponent:()=>import('./servicios/editusuarios/editusuarios.component')
},
{
        
  path: 'productos',
  loadComponent:()=>import('./servicios/producto/producto.component')
},
{
        
  path: 'visu',
  loadComponent:()=>import('./servicios/visu/visu.component')
},
{
        
  path: 'Eproductos',
  loadComponent:()=>import('./servicios/editproductos/editproductos.component')
},
{
        
  path: 'docientos',
  loadComponent:()=>import('./servicios/docientos/docientos.component')
},
{
        
  path: 'poli',
  loadComponent:()=>import('./servicios/politica/politica.component')
},
{
        
  path: 'todo',
  loadComponent:()=>import('./servicios/todo/todo.component')
},
{
        
  path: 'tarjetas',
  loadComponent:()=>import('./servicios/tarjetas/tarjetas.component')
},
{
        
  path: 'editTar',
  loadComponent:()=>import('./servicios/edit-tarjetas/edit-tarjetas.component')
},
{
        
  path: 'ubica',
  loadComponent:()=>import('./servicios/ubicacion/ubicacion.component')
},
{
        
  path: 'ad',
  loadComponent:()=>import('./servicios/adm-ubicacion/adm-ubicacion.component')
},
{
        
  path: 'ayuda',
  loadComponent:()=>import('./servicios/ayuda/ayuda.component')
},
{
        
  path: 'QR',
  loadComponent:()=>import('./servicios/qr/qr.component')
},





];
