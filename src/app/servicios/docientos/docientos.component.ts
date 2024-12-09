// dociento.component.ts
import { Component, OnInit } from '@angular/core';
import { IniciosSService, Dociento } from '../inicios-s.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dociento',
  templateUrl: './docientos.component.html',
  styleUrls: ['./docientos.component.css'],
  imports: [CommonModule]
})
export default class DocientoComponent implements OnInit {

  docientosFiltrados: Dociento[] = [];
  productos: any[] = []; // Esta es la propiedad que mostrará los productos

  constructor(
    private iniciosSService: IniciosSService, // Solo usamos IniciosSService
    private router: Router // Inyectar Router aquí
  ) {}

  ngOnInit(): void {
    // Obtén los productos desde la API Flask y luego filtra aquellos con precio menor a 200
    this.iniciosSService.obtenerDocientos().subscribe((productos) => {
      this.docientosFiltrados = productos.filter(producto => producto.precio < 200);
    });

    // Llamamos al servicio para obtener los productos
    this.iniciosSService.obtenerProductos().subscribe(
      (data: any[]) => {
        this.productos = data;
      },
      (error: any) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  agregarAlCarrito(productoId: number): void {
    const usuarioId = 1; // Cambia esto por el ID del usuario real
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

}
