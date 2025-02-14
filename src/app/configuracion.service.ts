import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {
  private baseUrl = 'http://localhost:5000'; // Ejemplo de URL donde corre tu backend

  constructor(private http: HttpClient) {}

  // Obtener la configuración de un usuario específico
  obtenerConfiguracion(userId: number): Observable<any> {
    // Suponiendo que tu endpoint sea GET /configuraciones/:userId
    return this.http.get<any>(`${this.baseUrl}/configuraciones/${userId}`);
  }

  // Guardar o actualizar la configuración
  guardarConfiguracion(config: any): Observable<any> {
    // Suponiendo que tu endpoint sea POST /configuraciones
    return this.http.post<any>(`${this.baseUrl}/configuraciones`, config);
  }
}
