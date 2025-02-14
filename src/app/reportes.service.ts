import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = 'http://localhost:5000/reportes';

  constructor(private http: HttpClient) {}

  getReportesDiarios(): Observable<any> {
    return this.http.get(`${this.apiUrl}/diarios`);
  }

  getReportesSemanales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/semanales`);
  }

  getReportesMensuales(): Observable<any> {
    return this.http.get(`${this.apiUrl}/mensuales`);
  }

 
  }

