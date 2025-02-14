import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GenerarService } from 'src/app/generar.service';

@Component({
  selector: 'app-reporte',
  templateUrl: './generar.component.html',
  styleUrls: ['./generar.component.css'],
  imports: [FormsModule]
})
export default class ReporteComponent implements OnInit {
  // Objeto reporte adaptado a la estructura de la BD:
  // - id_area: clave foránea (número o string, según convenga)
  // - tipo_emergencia: la opción seleccionada en el desplegable de emergencia
  // - comentarios: descripción o comentarios del reporte
  // - estado y respuesta se mantienen, o se pueden omitir si no se usan en la inserción
  reporte = {
    id_area: null,
    tipo_emergencia: 'Lentitud en la PC',
    comentarios: '',
    estado: 'Pendiente',
    respuesta: ''
  };

  // Arreglo que contendrá las áreas para poblar el select (se asume que se recuperan desde la BD)
  areas: any[] = [];

  constructor(private generarService: GenerarService, private router: Router) {}

  ngOnInit(): void {
    // Cargar las áreas desde el servicio para que el select se llene dinámicamente
    this.generarService.getAreas().subscribe(
      data => {
        this.areas = data;
      },
      error => {
        console.error("Error al cargar las áreas:", error);
      }
    );
  }

  enviarReporte(): void {
    // Enviar el objeto 'reporte' al servicio para crear el registro en la BD
    this.generarService.crearReporte(this.reporte).subscribe(
      response => {
        console.log("✅ Reporte guardado:", response);
        alert("Reporte guardado correctamente.");
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      error => {
        console.error("⚠️ Error al guardar el reporte:", error);
      }
    );
  }

  volver(): void {
    this.router.navigate(['/']);
  }
}
