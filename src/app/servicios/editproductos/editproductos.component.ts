import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IniciosSService, Producto } from '../inicios-s.service'; // Importar el servicio correcto

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './editproductos.component.html',
  styleUrls: ['./editproductos.component.css'],
  imports: [CommonModule, FormsModule]
})
export default class GestionProductosComponent implements OnInit {
  productos: Producto[] = [];            // Lista de todos los productos
  productoSeleccionado?: Producto;       // Producto actualmente seleccionado para editar
  imagenSeleccionada?: File;             // Imagen seleccionada para el producto

  constructor(private iniciosService: IniciosSService) {}

  ngOnInit(): void {
    // Llamar a la función para obtener todos los productos al inicializar el componente
    this.obtenerProductos29();
  }

  // Obtener todos los productos desde el servicio
  obtenerProductos29() {
    this.iniciosService.obtenerProductos29() // Llama al método correcto `obtenerProductos29` del servicio
      .subscribe(
        (data: Producto[]) => {
          this.productos = data; // Asignar la lista de productos obtenidos
        },
        (error: any) => {
          console.error('Error al obtener los productos:', error);
        }
      );
  }

  // Seleccionar un producto para editarlo
  seleccionarProducto29(producto: Producto) {
    // Hacer una copia del producto seleccionado para evitar modificar el original hasta que se guarden los cambios
    this.productoSeleccionado = { ...producto };
    this.imagenSeleccionada = undefined; // Reiniciar la imagen seleccionada al seleccionar un producto nuevo
  }

  // Método para manejar la selección de una nueva imagen
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imagenSeleccionada = file;
    }
  }

  // Actualizar el producto seleccionado
  actualizarProducto29() {
    if (this.productoSeleccionado) {
      // Crear un FormData para enviar el producto actualizado junto con la imagen
      const formData = new FormData();
      formData.append('nombre_producto', this.productoSeleccionado.nombre_producto);
      formData.append('precio', this.productoSeleccionado.precio.toString());
      formData.append('descripcion', this.productoSeleccionado.descripcion);
      formData.append('categoria', this.productoSeleccionado.categoria);

      if (this.imagenSeleccionada) {
        formData.append('imagen', this.imagenSeleccionada); // Añadir la imagen seleccionada si existe
      }

      this.iniciosService.actualizarProducto29(
        this.productoSeleccionado.id,
        formData  // Asegurarse de pasar el FormData
      )
      .subscribe(
        () => {
          alert('Producto actualizado correctamente');
          // Refrescar la lista de productos para reflejar los cambios
          this.obtenerProductos29();
          // Limpiar la selección del producto después de la actualización
          this.productoSeleccionado = undefined;
          this.imagenSeleccionada = undefined;
        },
        (error: any) => {
          console.error('Error al actualizar el producto:', error);
          alert('Ocurrió un error al actualizar el producto.');
        }
      );
    }
  }

  // Eliminar un producto
  eliminarProducto29(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.iniciosService.eliminarProducto29(id) // Llama al método correcto `eliminarProducto29`
        .subscribe(
          () => {
            alert('Producto eliminado correctamente');
            // Refrescar la lista de productos para reflejar los cambios
            this.obtenerProductos29();
          },
          (error: any) => {
            console.error('Error al eliminar el producto:', error);
            alert('Ocurrió un error al eliminar el producto.');
          }
        );
    }
  }
}
