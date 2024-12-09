import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IniciosSService } from '@servicios/inicios-s.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'; // Importar el Router para la redirección

@Component({
  selector: 'app-login',
  templateUrl: './insesion.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  styleUrls: ['./insesion.component.css']
})
export default class LoginComponent implements OnInit {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private iniciosSService: IniciosSService,
    private router: Router // Inyectar el Router aquí para manejar la navegación
  ) {
    // Definir los campos del formulario con validaciones
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Inicializa el formulario y revisa si ya hay datos en LocalStorage para autocompletar
    const savedEmail = this.iniciosSService.getSavedEmail();
    if (savedEmail) {
      this.registroForm.patchValue({ email: savedEmail });
    }
  }

  guardarDatos(): void {
    if (this.registroForm.valid) {
      const { email, contrasena } = this.registroForm.value;

      // Guardar email en LocalStorage para autocompletar en el futuro
      this.iniciosSService.saveEmailToLocalStorage(email);

      // Realizar login usando IniciosSService
      this.iniciosSService.login(email, contrasena).subscribe(
        (response: any) => {
          // Guardar el token usando IniciosSService si el login fue exitoso
          if (response && response.token) {
            this.iniciosSService.saveToken(response.token);
            console.log('Inicio de sesión exitoso');

            // Guardar en el localStorage que el usuario está autenticado y su nombre
            localStorage.setItem('usuarioAutenticado', 'true');

            if (response.nombre) {
              localStorage.setItem('nombreUsuario', response.nombre); // Guardar el nombre del usuario
            }

            if (response.rol) {
              localStorage.setItem('tipoUsuario', response.rol); // Guardar el rol del usuario (e.g. 'admin' o 'user')
            }

            // Redirigir a la página principal
            this.router.navigate(['/inicio']);
          } else {
            console.error('Respuesta inesperada del servidor: falta el token');
            alert('Error inesperado en el servidor. Por favor, intente más tarde.');
          }
        },
        (error: any) => {
          // Manejar errores específicos del servidor
          console.error('Error en el inicio de sesión:', error);
          if (error.status === 401) {
            alert('Credenciales incorrectas. Por favor, verifica tu email y contraseña.');
            console.error('Error al iniciar sesión: credenciales incorrectas');
          } else if (error.status === 500) {
            alert('Error interno del servidor. Por favor intenta más tarde.');
            console.error('Error interno del servidor.');
          } else {
            alert('Error al iniciar sesión. Intente nuevamente.');
            console.error('Error al iniciar sesión:', error);
          }
        }
      );
    } else {
      console.log('El formulario es inválido');
      alert('Por favor completa correctamente todos los campos.');
    }
  }
}
