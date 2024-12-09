import { Component, OnInit, OnDestroy } from '@angular/core';
import { DashboardService } from 'src/app/dashboard.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  standalone: true,
  imports: [],
})
export default class AdminComponent implements OnInit, OnDestroy {
  datos: any = {
    productos: 0,
    pagos: 0,
    ubicaciones: 0,
    usuarios: 0,
  };

  private updateInterval: any; // Variable para manejar el temporizador

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.cargarDatosDashboard(); // Cargar datos iniciales
    this.iniciarActualizacionAutomatica(); // Iniciar el temporizador
  }

  ngOnDestroy(): void {
    clearInterval(this.updateInterval); // Limpiar el temporizador al destruir el componente
  }

  cargarDatosDashboard(): void {
    this.dashboardService.obtenerDatosDashboard().subscribe(
      (data) => {
        this.datos = data; // Actualiza los datos recibidos del backend
      },
      (error) => {
        console.error('Error al cargar los datos del dashboard:', error);
      }
    );
  }

  iniciarActualizacionAutomatica(): void {
    // Actualiza los datos cada 10 segundos (10000 ms)
    this.updateInterval = setInterval(() => {
      this.cargarDatosDashboard();
    }, 10000);
  }
}
