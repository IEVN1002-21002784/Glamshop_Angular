import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfiguracionService } from 'src/app/configuracion.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🔥 Importa FormsModule para [(ngModel)]
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export default class ConfiguracionComponent implements OnInit {
  // 🔑 Supongamos que tienes un userId para identificar al usuario
  userId: number = 1;  // Ejemplo. Podrías obtenerlo del login, token JWT, localStorage, etc.

  modoOscuro: boolean = false;
  idioma: string = 'es';

  constructor(
    private configuracionService: ConfiguracionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 🔹 Al iniciar, obtenemos la configuración desde el backend
    //    enviando el userId. (Esto depende de cómo hayas diseñado tu API)
    this.configuracionService.obtenerConfiguracion(this.userId).subscribe(config => {
      if (config) {
        this.modoOscuro = config.modoOscuro;
        this.idioma = config.idioma;
      }
      this.aplicarModoOscuro();
      this.aplicarIdioma();
    });
  }

  guardarConfiguracion(): void {
    // 🔹 Construimos el objeto que enviaremos al backend
    const config = {
      userId: this.userId,
      modoOscuro: this.modoOscuro,
      idioma: this.idioma
    };

    console.log("📩 Datos antes de enviar al backend:", config);

    // 🔹 Llamamos a nuestro servicio para guardar en la BD
    this.configuracionService.guardarConfiguracion(config).subscribe(
      response => {
        console.log("✅ Respuesta del backend:", response);

        this.aplicarModoOscuro();
        this.aplicarIdioma();

        // ✅ Redirigir a la página principal y recargar
        this.router.navigate(['/']).then(() => {
          console.log("🔄 Redirección completada a la página principal");
          setTimeout(() => {
            window.location.reload();
          }, 500); // Espera 500ms antes de recargar
        });
      },
      error => {
        console.error("⚠️ Error al guardar la configuración:", error);
      }
    );
  }

  aplicarModoOscuro(): void {
    if (this.modoOscuro) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  aplicarIdioma(): void {
    localStorage.setItem('idioma', this.idioma);
    // Aquí podrías cargar tus traducciones o refrescar la vista con el idioma seleccionado
  }
}
