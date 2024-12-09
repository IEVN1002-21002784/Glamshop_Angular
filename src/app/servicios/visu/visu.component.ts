import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IniciosSService } from '@servicios/inicios-s.service';// Importa el servicio IniciosSService

@Component({
  selector: 'app-visu',
  templateUrl: './visu.component.html',
  styleUrls: ['./visu.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export default class ResultadosBusquedaComponent implements OnInit {
  productosEncontrados: any[] = [];  // Define la propiedad para almacenar los productos

  // Propiedades y estado de autenticación y administrador
  usuarioAutenticado: boolean = false;
  nombreUsuario: string | null = null;
  mostrarOpcionesPerfil: boolean = false;
  esAdministrador: boolean = false;

  constructor(
    private router: Router,
    private iniciosSService: IniciosSService  // Inyectar el servicio IniciosSService para manejar el carrito
  ) {
    // Obtener los datos pasados en el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { productos: any[] };  // Especifica que se espera un array de productos

    if (state && state.productos) {
      this.productosEncontrados = state.productos;  // Asigna los productos encontrados a la propiedad
    }

    // Verificar si el usuario está autenticado al inicializar el componente
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    const tipoUsuario = localStorage.getItem('tipoUsuario'); // Leer el tipo de usuario del localStorage

    if (usuarioAutenticado === 'true') {
      this.usuarioAutenticado = true;
      this.nombreUsuario = localStorage.getItem('nombreUsuario');

      // Determinar si el usuario tiene privilegios de administrador
      if (tipoUsuario === 'admin') {
        this.esAdministrador = true; // El usuario tiene privilegios de administrador
      }
    }
  }

  ngOnInit(): void {}

  // Método para redirigir a la página de administración
  irAdministracion(): void {
    console.log('Redirigiendo a la administración...');
    this.router.navigate(['/admin']); // Asegúrate de tener esta ruta configurada para la administración
  }

  // Método para alternar la visibilidad del menú del usuario
  toggleMenuUsuario(): void {
    this.mostrarOpcionesPerfil = !this.mostrarOpcionesPerfil;
  }

  // Método para agregar un producto al carrito
  agregarAlCarrito(productoId: number): void {
    const usuarioId = 1; // Cambia esto por el ID del usuario real, puede obtenerse de localStorage si es necesario
    const cantidad = 1; // Puedes modificar la lógica para obtener la cantidad deseada

    this.iniciosSService.agregarProductoAlCarrito(usuarioId, productoId, cantidad)
      .subscribe(
        response => {
          console.log('Producto agregado al carrito', response);
          // Redireccionamos a la página del carrito después de añadir el producto
          this.router.navigate(['/carrito']);
        },
        error => {
          console.error('Error al agregar el producto al carrito', error);
        }
      );
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    console.log('Cerrando sesión...');
    // Limpiar los datos de sesión en localStorage
    localStorage.removeItem('usuarioAutenticado');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    // Actualizar estado de autenticación y redirigir al login
    this.usuarioAutenticado = false;
    this.esAdministrador = false;
    this.router.navigate(['/servicios/Insesion']);
  }
}
