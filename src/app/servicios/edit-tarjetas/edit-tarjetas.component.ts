import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IniciosSService } from '@servicios/inicios-s.service';


interface TarjetaCredito {
  id: number;
  titular: string;
  numero_tarjeta: string;
  fecha_expiracion: string;
  cvv: string;
}

@Component({
  selector: 'app-edit-tarjetas',
  imports: [ReactiveFormsModule , FormsModule , CommonModule],
  templateUrl: './edit-tarjetas.component.html',
  styleUrl: './edit-tarjetas.component.css'
})
export default class EditTarjetasComponent {
  tarjetas: TarjetaCredito[] = [];

  constructor(private iniciosService: IniciosSService) {}

  ngOnInit(): void {
    this.obtenerTarjetas();
  }

  obtenerTarjetas(): void {
    this.iniciosService.obtenerTarjetas().subscribe(
      (data) => {
        this.tarjetas = data;
        console.log('Datos de tarjetas recibidos:', data);
      },
      (error) => {
        console.error('Error al cargar las tarjetas:', error);
      }
    );
  }
  // Método para eliminar una tarjeta
eliminarTarjeta(id: number): void {
  this.iniciosService.eliminarTarjeta(id).subscribe(
    () => {
      console.log('Tarjeta eliminada con éxito:', id);
      this.tarjetas = this.tarjetas.filter(tarjeta => tarjeta.id !== id); // Actualiza la lista localmente después de eliminar
    },
    (error) => {
      console.error('Error al eliminar la tarjeta:', error);
    }
  );
}

}