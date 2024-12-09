import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UbicacionService {
  private apiUrl = 'http://127.0.0.1:5000/ubicaciones'; // Cambia 'tu-api.com' por localhost si estás probando localmente


  constructor(private http: HttpClient) {}

  // Obtener todas las ubicaciones
  obtenerUbicaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Actualizar una ubicación específica
  actualizarUbicacion(id: number, ubicacion: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, ubicacion);
  }

  // Eliminar una ubicación específica
  eliminarUbicacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
