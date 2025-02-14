import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IniciosService {
  private apiUrl = 'http://127.0.0.1:5000/api'; // URL base de la API

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    // Eliminar espacios en blanco al inicio y final
    username = username.trim();
    password = password.trim();

    const url = this.apiUrl + '/login'; // Construcción de la URL
    const body = { username, password }; // Cuerpo de la petición

    // Log para verificar qué se está enviando a la API
    console.log("JSON enviado:", JSON.stringify(body));

    return this.http.post<any>(url, body, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }
}
