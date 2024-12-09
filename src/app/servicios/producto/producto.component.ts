import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { IniciosSService, Producto } from '@servicios/inicios-s.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export default class ProductoComponent {
  productoForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private iniciosSService: IniciosSService) {
    // Inicializar el formulario reactivo con los campos correctos
    this.productoForm = this.fb.group({
      nombre_producto: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(0)]],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  // Manejar la selección de la imagen
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
      if (allowedTypes.includes(file.type)) {
        this.selectedFile = file;
        console.log('Imagen seleccionada:', file);
      } else {
        alert('El archivo debe ser una imagen válida (png, jpg, jpeg, gif).');
        this.selectedFile = null;
      }
    } else {
      console.warn('No se ha seleccionado ninguna imagen');
    }
  }

  // Manejar la presentación del formulario
  onSubmit(): void {
    console.log('Formulario enviado');
    console.log('Datos del formulario:', this.productoForm.value);
    console.log('Archivo seleccionado:', this.selectedFile);

    if (this.productoForm.valid && this.selectedFile) {
      const nuevoProducto: Producto = {
        id: 0, // Este valor puede ser ignorado ya que el ID será generado por el backend
        nombre_producto: this.productoForm.get('nombre_producto')?.value,
        precio: this.productoForm.get('precio')?.value,
        descripcion: this.productoForm.get('descripcion')?.value,
        categoria: this.productoForm.get('categoria')?.value,
        imagen: '' // Este campo se completará con el nombre de la imagen en el servidor
      };

      this.iniciosSService.registrarProducto(nuevoProducto, this.selectedFile).subscribe(
        (response) => {
          console.log('Producto registrado con éxito:', response);
          alert('Producto registrado exitosamente');
          this.productoForm.reset();
          this.selectedFile = null;
        },
        (error) => {
          console.error('Error al registrar el producto:', error);
          if (error.status === 500) {
            alert('Error en el servidor. Por favor, intenta nuevamente más tarde.');
          } else if (error.status === 400) {
            alert('Solicitud incorrecta. Por favor revisa los datos e intenta nuevamente.');
          } else {
            alert('Ocurrió un error inesperado. Intenta nuevamente.');
          }
        }
      );
    } else {
      console.warn('Formulario inválido o imagen no seleccionada');
      if (!this.selectedFile) {
        alert('Por favor selecciona una imagen para continuar.');
      }
      if (this.productoForm.invalid) {
        alert('Por favor completa todos los campos correctamente.');
      }
    }
  }
}
