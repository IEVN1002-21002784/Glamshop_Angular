import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IniciosService } from '../inicio.service';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export default class PrincipalComponent implements OnInit {
  loginForm: FormGroup;
  mensajeError: string = ''; // Agregado para manejar mensajes de error

  constructor(private fb: FormBuilder, private iniciosService: IniciosService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;
      const password = this.loginForm.get('password')?.value;
      console.log("Enviando:", username + password);

      // Se corrigió el nombre del servicio (antes estaba `this.inicioService`, ahora es `this.iniciosService`)
      this.iniciosService.login(username, password).subscribe(
        (response) => {
          if (response.success) {
            console.log("✅ Inicio de sesión exitoso:", response);
            alert(`Bienvenido, ${response.nombreUsuario}`); // Se corrigió la interpolación de variables
            
            // Redirige a otra página si es necesario
            this.router.navigate(['/reportes']); 
          } else {
            this.mensajeError = "⚠️ Usuario o contraseña incorrectos";
          }
        },
        (error) => {
          console.error("⚠️ Error en la petición:", error);
          this.mensajeError = "⚠️ Error de conexión con el servidor";
        }
      );
    } else {
      this.mensajeError = "⚠️ Por favor, completa todos los campos";
    }
  }
}
