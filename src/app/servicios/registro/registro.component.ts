import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IniciosSService } from '@servicios/inicios-s.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [ReactiveFormsModule,CommonModule],
  standalone:true
})
export default class RegistroComponent implements OnInit {
  // Definición del FormGroup para el formulario
  registroForm!: FormGroup;

  constructor(private fb: FormBuilder, private iniciosSService: IniciosSService) {}

  ngOnInit(): void {
    // Inicializa el FormGroup
    this.registroForm = this.ngformulario()
  }
  ngformulario():FormGroup{
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  // Función para alternar la visibilidad del input
  alternarEntrada(inputField: string): void {
    const inputElement = document.getElementById(inputField) as HTMLInputElement;
    if (inputElement) {
      if (inputElement.style.display === 'block') {
        inputElement.style.display = 'none';
      } else {
        inputElement.style.display = 'block';
        inputElement.focus();
      }
    }
  }

  // Adaptación de la función guardarDatos para trabajar con el servicio de registro
  guardarDatos(): void {
    // Verificar si el formulario es válido
    console.log(this.registroForm.value);
      
    if (this.registroForm.value) {
      // Extraer los valores del FormGroup
      const userData = this.registroForm.value;
      
      // Llamar al servicio para registrar al usuario
      this.iniciosSService.registrarUsuario(userData).subscribe(
        (response) => {
          console.log('Registro exitoso:', response);
          alert('¡Cuenta creada exitosamente!');
        },
        (error) => {
          console.error('Error al registrar:', error);
          alert('Hubo un problema al crear la cuenta. Por favor, inténtalo de nuevo.');
        }
      );
    } else {
      // Mostrar alerta si hay campos incompletos
      alert('Por favor, completa todos los campos antes de registrarte.');
      // Marcar todos los campos como "tocados" para que se muestren los errores
      this.registroForm.markAllAsTouched();
    }
  }
}
