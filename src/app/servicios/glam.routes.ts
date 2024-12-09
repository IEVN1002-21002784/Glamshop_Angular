import  { Routes,RouterLink} from "@angular/router"
export default [
    {
        
        path: 'Insesion',
        loadComponent:()=>import('./insesion/insesion.component')
    },
    {
        path: 'Principal',
        loadChildren: () => import('../principal/principal.component')
  
      },
      
]