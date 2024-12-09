import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IniciosSService } from '@servicios/inicios-s.service';
import { Router } from '@angular/router'; // Importar Router para redireccionar

@Component({
  selector: 'app-carrito',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'] // Cambié `styleUrl` a `styleUrls`
})
export default class CarritoComponent {
  carrito: any[] = [];
  totalCompra: number = 0;

  constructor(
    private iniciosSService: IniciosSService,
    private router: Router // Inyectar Router aquí para la redirección
  ) {}

  ngOnInit() {
    this.obtenerCarrito();
  }

  obtenerCarrito(): void {
    this.iniciosSService.obtenerCarritoBackend().subscribe(
      (data: any[]) => {
        this.carrito = data;
        console.log('Carrito cargado:', this.carrito);
        this.calcularTotal();
      },
      (error: any) => {
        console.error('Error al obtener los productos del carrito', error);
      }

      
    );
  }

  onCantidadChange(event: Event, indice: number): void {
    // Realizamos el casting de target a HTMLInputElement
    const inputElement = event.target as HTMLInputElement;

    // Obtenemos el valor del input y lo convertimos a number
    const nuevaCantidad = Number(inputElement.value);

    // Obtener el productoId desde el carrito
    const productoId = this.carrito[indice].id;

    // Actualizamos la cantidad en el objeto del carrito local antes de realizar la solicitud
    this.carrito[indice].cantidad = nuevaCantidad;

    // Llamar al servicio para actualizar la cantidad
    this.iniciosSService.actualizarCantidad(productoId, nuevaCantidad)
      .subscribe(
        () => {
          console.log('Cantidad actualizada');
          // Recalcular el total después de actualizar la cantidad
          this.calcularTotal();
        },
        (error) => {
          console.error('Error al actualizar la cantidad', error);
        }
      );


  }

  eliminarDelCarrito(indice: number): void {
    const producto = this.carrito[indice];
    
    // Verifica si el producto existe y tiene un `id` válido
    if (!producto || producto.id == null) {
        console.error('Producto no encontrado o ID no válido:', producto);
        return; // Si no hay producto o el ID es inválido, evita continuar
    }

    console.log('ID del producto a eliminar:', producto.id);

    // Llama al servicio para eliminar el producto del carrito usando `id`
    this.iniciosSService.eliminarProductoBackend(producto.id).subscribe(
        () => {
            // Eliminar el producto del array local del carrito si la solicitud fue exitosa
            this.carrito.splice(indice, 1);
            console.log('Producto eliminado');
            this.calcularTotal(); // Actualiza el total del carrito después de eliminar un producto
        },
        (error) => {
            console.error('Error al eliminar el producto del carrito', error);
        }
    );
}




  

  calcularTotal(): number {
    this.totalCompra = this.carrito.reduce(
      (total, producto) => total + producto.precio * producto.cantidad,
      0
    );
    return this.totalCompra;
  }

  mostrarCarrito() {
    console.log('Mostrar carrito clicado');
    // Aquí puedes agregar la lógica para mostrar u ocultar el carrito si es necesario.
  }

  procederAlPago(): void {
    this.iniciosSService.procesarPago().subscribe(() => {
      console.log('Pago procesado');
      this.carrito = [];
      this.totalCompra = 0; // Reiniciar el total después de proceder al pago
      this.router.navigate(['/confirmacion-pago']); // Redirigir a una página de confirmación si es necesario
    });
  }

  // Método para redirigir al carrito
  redirigirAlCarrito(): void {
    this.router.navigate(['/carrito']); // Redirigir a la vista del carrito
  }
}
