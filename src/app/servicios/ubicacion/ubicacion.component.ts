import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IniciosSService } from '@servicios/inicios-s.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-ubicacion',
  imports: [CommonModule ,ReactiveFormsModule,FormsModule,],
  templateUrl: './ubicacion.component.html',
  styleUrl: './ubicacion.component.css'
})
export default class UbicacionComponent {
  constructor(private iniciosService: IniciosSService) {}

  onSubmit(form: NgForm): void {
    if (form.valid) {
      const formData = {
        codigo_postal: form.value.codigo_postal,
        colonia: form.value.colonia,
        numero_exterior: form.value.numero_exterior,
        calle: form.value.calle,
        descripcion: form.value.descripcion,
      };

      this.iniciosService.submitLocation(formData).subscribe(
        response => {
          alert('Ubicación guardada con éxito');
        },
        error => {
          console.error('Error al enviar la información:', error);
          alert('Hubo un problema al enviar la ubicación');
        }
      );
    } else {
      alert('Por favor, completa todos los campos obligatorios');
    }
  }
}
