import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GenerarService {
  private apiUrl = 'http://127.0.0.1:5000/api';

  constructor(private http: HttpClient) {}

  // Crea un reporte en la BD
  crearReporte(reporte: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reportes`, reporte);
  }

  // Obtiene las áreas para poblar el select en el formulario
  getAreas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/areas`);
  }

  // Descarga el reporte en PDF
  descargarPDF(id: number): void {
    window.open(`${this.apiUrl}/reportes/${id}/descargar`, '_blank');
  }
}
