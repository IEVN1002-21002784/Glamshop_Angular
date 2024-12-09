import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class QrService {
    private baseUrl = 'http://localhost:5000';

    constructor(private http: HttpClient) {}

    getUser(userId: number): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get(`${this.baseUrl}/user?user_id=${userId}`, { headers });
    }
    
    getCart(userId: number): Observable<any> {
      const headers = this.getAuthHeaders();
      return this.http.get(`${this.baseUrl}/cart?user_id=${userId}`, { headers });
    }
    

    getUbicaciones(): Observable<any> {
        const headers = this.getAuthHeaders();
        return this.http.get(`${this.baseUrl}/ubicacion`, { headers });
    }

    generateQR(payload: any): Observable<Blob> {
      return this.http.post('http://localhost:5000/generate_qr', payload, {
        responseType: 'blob'
      });
    }
    
    private getAuthHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        });
    }
}
