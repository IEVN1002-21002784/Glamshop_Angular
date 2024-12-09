import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IniciosSService } from '@servicios/inicios-s.service';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  imports: [CommonModule]
})
export default class TodoComponent implements OnInit {
  productos: any[] = [];
  errorMessage: string = '';

  constructor(private iniciosService: IniciosSService, private router: Router) { } // Añadir router al constructor

  ngOnInit(): void {
    this.iniciosService.getProductos().subscribe(
      (data) => {
        this.productos = data;
        console.log('Productos:', this.productos);
      },
      (error) => {
        this.errorMessage = 'Error al obtener los productos: ' + error.message;
        console.error('Error al obtener los productos', error);
      }
    );
  }

  agregarAlCarrito(productoId: number): void {
    const usuarioId = 1; // Cambia esto por el ID del usuario real
    const cantidad = 1; // Puedes modificar la lógica para obtener la cantidad deseada

    this.iniciosService.agregarProductoAlCarrito(usuarioId, productoId, cantidad)
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

  // Aquí es donde se coloca la función `imagenError`
  imagenError(event: any): void {
    // Cambia la URL a una imagen que sepas que existe en `src/assets`
    event.target.src = 'assets/placeholder.png';
  }
}
