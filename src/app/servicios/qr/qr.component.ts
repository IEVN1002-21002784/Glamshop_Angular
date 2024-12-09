import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QrService } from 'src/app/qr.service';

@Component({
  selector: 'app-formulario-envio',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export default class FormularioEnvioComponent implements OnInit {
  usuario: any = { nombre: 'No disponible', email: 'No disponible', telefono: 'No disponible' };
  productos: any[] = [];
  totalAPagar: number = 0; // Propiedad para el total del carrito
  ubicaciones: any[] = [];
  ubicacionSeleccionada: number | null = null;
  ubicacionId: number | null = null; // Declaración de la propiedad faltante
  qrData: any = null;

  constructor(private qrService: QrService) {}

  ngOnInit(): void {
    this.cargarUsuario();
    this.cargarCarrito();
    this.cargarUbicaciones();
  }

  cargarUsuario(): void {
    this.qrService.getUser(1).subscribe({
      next: (user: any) => {
        this.usuario = user;
      },
      error: (err) => {
        console.error('Error al cargar el usuario:', err);
      }
    });
  }

  cargarCarrito(): void {
    this.qrService.getCart(1).subscribe({
      next: (cart: any) => {
        // Asegúrate de que el backend devuelve un objeto con productos y total_a_pagar
        this.productos = cart.productos; // Extrae los productos
        this.totalAPagar = cart.total_a_pagar; // Asigna el total a pagar
      },
      error: (err) => {
        console.error('Error al cargar el carrito:', err);
      }
    });
  }

  cargarUbicaciones(): void {
    this.qrService.getUbicaciones().subscribe({
      next: (ubicaciones: any) => {
        this.ubicaciones = ubicaciones;
      },
      error: (err) => {
        console.error('Error al cargar ubicaciones:', err);
      }
    });
  }

  generarQR(): void {
    // Asignar el valor de ubicacionSeleccionada a ubicacionId antes de la validación
    this.ubicacionId = this.ubicacionSeleccionada;

    if (!this.ubicacionId) {
      console.error('Selecciona una ubicación antes de generar el QR.');
      return;
    }

    const payload = {
      ubicacion_id: this.ubicacionId
    };

    this.qrService.generateQR(payload).subscribe({
      next: (response) => {
        // Crear un enlace para descargar el archivo
        const blob = new Blob([response], { type: 'image/png' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'qr_code.png';
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error al generar el QR:', err);
      }
    });
  }

  descargarArchivo(dataUrl: string, nombreArchivo: string): void {
    const enlace = document.createElement('a');
    enlace.href = dataUrl;
    enlace.download = nombreArchivo;
    enlace.click();
  }
}
