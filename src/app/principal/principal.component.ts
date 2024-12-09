import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IniciosSService, Producto } from '@servicios/inicios-s.service';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export default class PrincipalComponent implements OnInit {

  currentIndex: number = 0;
  totalImages: number = 0;

  usuarioAutenticado: boolean = false;
  nombreUsuario: string | null = null;
  mostrarOpcionesPerfil: boolean = false;
  esAdministrador: boolean = false;

  terminoBusqueda: string = '';
  productosEncontrados: any[] = [];
  
  productos: any[] = []; // Declara esta propiedad

  constructor(private router: Router, private iniciosSService: IniciosSService) {}

  ngOnInit(): void {
    this.totalImages = document.querySelectorAll('.carousel-image').length;
    this.startAutoCarousel();

    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');
    const tipoUsuario = localStorage.getItem('tipoUsuario'); 

    if (usuarioAutenticado === 'true') {
      this.usuarioAutenticado = true;
      this.nombreUsuario = localStorage.getItem('nombreUsuario');

      if (tipoUsuario === 'admin') {
        this.esAdministrador = true;

        this.iniciosSService.obtenerProductos().subscribe((data) => {
          this.productos = data; 
        });
      }
    }
  }

  irAdministracion(): void {
    console.log('Redirigiendo a la administración...');
    this.router.navigate(['/admin']); 
  }

  toggleMenuUsuario(): void {
    this.mostrarOpcionesPerfil = !this.mostrarOpcionesPerfil;
  }

  cerrarSesion(): void {
    console.log('Cerrando sesión...');
    localStorage.removeItem('usuarioAutenticado');
    localStorage.removeItem('nombreUsuario');
    localStorage.removeItem('token');
    localStorage.removeItem('tipoUsuario');
    this.usuarioAutenticado = false;
    this.esAdministrador = false;
    this.router.navigate(['/servicios/Insesion']);
  }

  moveCarousel(direction: string): void {
    if (direction === 'next') {
      this.currentIndex = (this.currentIndex === this.totalImages - 1) ? 0 : this.currentIndex + 1;
    } else if (direction === 'prev') {
      this.currentIndex = (this.currentIndex === 0) ? this.totalImages - 1 : this.currentIndex - 1;
    }
    this.updateCarousel();
  }

  startAutoCarousel(): void {
    setInterval(() => {
      this.currentIndex = (this.currentIndex === this.totalImages - 1) ? 0 : this.currentIndex + 1;
      this.updateCarousel();
    }, 5000); 
  }

  updateCarousel(): void {
    const offset = -this.currentIndex * 100;
    const carouselElement = document.querySelector('.carousel') as HTMLElement;
    if (carouselElement) {
      carouselElement.style.transform = `translateX(${offset}%)`;
    }
  }

  buscar(): void {
    if (this.terminoBusqueda.trim() !== '') {
      this.iniciosSService.buscarProductos(this.terminoBusqueda).subscribe(
        (productos: Producto[]) => {
          console.log('Productos encontrados:', productos);
          this.router.navigate(['/visu'], { state: { productos } });
        },
        (error: any) => {
          console.error('Error al buscar productos:', error);
          alert('Error al buscar productos. Intente nuevamente.');
        }
      );
    }
  }

  // Método para agregar productos al carrito sin modificar otros métodos
  agregarAlCarrito(productoId: number): void {
    const usuarioId = 1; // Cambia esto por el ID del usuario real
    const cantidad = 1; // Puedes modificar la lógica para obtener la cantidad deseada

    this.iniciosSService.agregarProductoAlCarrito(usuarioId, productoId, cantidad)
      .subscribe(
        response => {
          console.log('Producto agregado al carrito', response);
          this.router.navigate(['/carrito']);
        },
        error => {
          console.error('Error al agregar el producto al carrito', error);
        }
      );
  }
}
