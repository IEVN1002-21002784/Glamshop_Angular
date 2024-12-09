import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UbicacionService } from 'src/app/ubicacion.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './adm-ubicacion.component.html',
  styleUrls: ['./adm-ubicacion.component.css'],
  standalone:true,
  imports:[FormsModule, ReactiveFormsModule ,CommonModule]
})
export default class UbicacionComponent implements OnInit {
  ubicaciones: any[] = []; // Lista para almacenar las ubicaciones desde la API

  constructor(private ubicacionService: UbicacionService) {} // Inyecta el servicio

  ngOnInit(): void {
    this.cargarUbicaciones(); // Carga las ubicaciones al iniciar el componente
  }

  // Método para cargar todas las ubicaciones desde la API
  cargarUbicaciones(): void {
    this.ubicacionService.obtenerUbicaciones().subscribe(
      (data) => {
        this.ubicaciones = data; // Asigna los datos de la API a la lista
      },
      (error) => {
        console.error('Error al cargar ubicaciones:', error);
        alert('Error al cargar las ubicaciones');
      }
    );
  }

  // Método para actualizar una ubicación
  actualizarUbicacion(ubicacion: any): void {
    this.ubicacionService.actualizarUbicacion(ubicacion.id, ubicacion).subscribe(
      (response) => {
        console.log('Ubicación actualizada:', response);
        alert('Ubicación actualizada correctamente');
      },
      (error) => {
        console.error('Error al actualizar ubicación:', error);
        alert('Error al actualizar la ubicación');
      }
    );
  }

  // Método para eliminar una ubicación
  eliminarUbicacion(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta ubicación?')) {
      this.ubicacionService.eliminarUbicacion(id).subscribe(
        () => {
          console.log('Ubicación eliminada');
          this.cargarUbicaciones(); // Recarga la tabla después de eliminar
          alert('Ubicación eliminada correctamente');
        },
        (error) => {
          console.error('Error al eliminar ubicación:', error);
          alert('Error al eliminar la ubicación');
        }
      );
    }
  }
}
