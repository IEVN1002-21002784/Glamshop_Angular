import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegistroData {
  email: string;
  nombre: string;
  phone: string;
  password: string;
}

export interface Usuario {
  id: number;
  email: string;
  nombre: string;
  telefono: string;
  contrasena: string;
  rol: string;
}

export interface Producto {
  id: number;
  nombre_producto: string;
  precio: number;
  descripcion: string;
  categoria: string;
  imagen: string;
}

export interface Dociento {
  id: number;
  nombre_producto: string;  // Nombre del producto
  precio: number;           // Precio del producto
  descripcion: string;      // Descripción del producto
  categoria: string;        // Categoría del producto
  imagen: string;           // URL de la imagen del producto
}

interface TarjetaCredito {
  id: number;
  titular: string;
  numero_tarjeta: string;
  fecha_expiracion: string;
  cvv: string;
}

@Injectable({
  providedIn: 'root',
})
export class IniciosSService {
  private apiUrl = 'http://127.0.0.1:5000';
  private tarjetaEndpoint = `${this.apiUrl}/guardar_tarjeta`;
  private ubicacion = `${this.apiUrl}/ubicacion`;

  
  constructor(private http: HttpClient) {}

  // Método para registrar un producto
  registrarProducto(producto: Producto, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('producto', JSON.stringify(producto));
    formData.append('archivo', archivo);

    return this.http.post<any>(`${this.apiUrl}/registrarProducto`, formData);
  }

  // Los demás métodos permanecen inalterados...

  registrarUsuario(userData: RegistroData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}/registrar`, userData, { headers });
  }

  login(email: string, contrasena: string): Observable<any> {
    const loginData = { email, contrasena };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(`${this.apiUrl}/login`, loginData, { headers });
  }

  saveEmailToLocalStorage(email: string): void {
    localStorage.setItem('email', email);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
    document.cookie = `sessionToken=${token}; path=/; secure; samesite=strict;`;
  }

  getSavedEmail(): string | null {
    return localStorage.getItem('email');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token; // Retorna true si el token existe
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    document.cookie = 'sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/usuarios`);
  }

  eliminarUsuario(id: number): Observable<any> {
    const url = `${this.apiUrl}/usuarios/${id}`;
    return this.http.delete<any>(url);
  }

  actualizarUsuario(usuario: Usuario): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const url = `${this.apiUrl}/usuarios/${usuario.id}`;
    return this.http.put<any>(url, usuario, { headers });
  }

  // --------------------- MÉTODOS ADAPTADOS CON EL SUFIJO "29" ---------------------

  obtenerProductos29(): Observable<Producto[]> {
    const url = `${this.apiUrl}/productos`;
    return this.http.get<Producto[]>(url);
  }

  actualizarProducto29(productoId: number, formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/productos/${productoId}`;
    return this.http.put<any>(url, formData);
  }

  eliminarProducto29(productoId: number): Observable<any> {
    const url = `${this.apiUrl}/productos/${productoId}`;
    return this.http.delete<any>(url);
  }

  obtenerProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);

  }



//CARRITO
obtenerCarritoBackend(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/carrito`);
}



actualizarCantidad(productoId: number, nuevaCantidad: number): Observable<any> {
  return this.http.put(`http://127.0.0.1:5000/carrito/${productoId}`, { cantidad: nuevaCantidad });
}

// Código del servicio `IniciosSService`
eliminarProductoBackend(productoId: number): Observable<any> {
  // Cambiar la URL al nuevo endpoint de Flask que proporcionaste
  return this.http.delete(`http://127.0.0.1:5000/carrito/${productoId}`);
}


procesarPago(): Observable<any> {
  // Añade la lógica para el procesamiento del pago
  return this.http.post(`${this.apiUrl}/carrito`, {});
}


btenerProductos(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/carrito`);
}



//TOD
getProductos(): Observable<any> {
  return this.http.get(this.apiUrl);
}




// Método para agregar un producto al carrito
agregarProductoAlCarrito(usuarioId: number, productoId: number, cantidad: number): Observable<any> {
  const payload = { producto_id: productoId, cantidad };
  return this.http.post(`${this.apiUrl}/carrito/${usuarioId}`, payload);
}


  


  

  agregarProducto29(producto: Producto, imagen: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('nombre_producto', producto.nombre_producto);
    formData.append('precio', producto.precio.toString());
    formData.append('descripcion', producto.descripcion);
    formData.append('categoria', producto.categoria);
    formData.append('imagen', imagen);

    const url = `${this.apiUrl}/productos`;
    return this.http.post<any>(url, formData);
  }


 //200
 obtenerDocientos(): Observable<Dociento[]> {
  return this.http.get<Dociento[]>(this.apiUrl+'/docientos');
 }


//TARJETA
  
procesarPagoo(datosTarjeta: any): Observable<any> {
  const headers = { 'Content-Type': 'application/json' };
  return this.http.post(`${this.apiUrl}/pagar`, datosTarjeta, { headers });
}

//TABLA TARJETA
obtenerTarjetas(): Observable<TarjetaCredito[]> {
  return this.http.get<TarjetaCredito[]>(`${this.apiUrl}/tarjetas`);
}

// Método para eliminar una tarjeta
eliminarTarjeta(id: number): Observable<any> {
  return this.http.delete(`${this.apiUrl}/tarjetas/${id}`);
}



//UBICACION
submitLocation(formData: any): Observable<any> {
  return this.http.post(`${this.apiUrl}/ubicacion`, formData); 
}


//EDITAR UBICACION
// Obtener todas las ubicaciones






  

  

  // Método para obtener las órdenes del usuario
  obtenerOrdenes(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://127.0.0.1:5000/ordenes', { headers }); // Cambia por la URL adecuada
  }



  
  buscarProductos(termino: string): Observable<Producto[]> {
    const url = `${this.apiUrl}/productos/buscar?termino=${termino}`;
    return this.http.get<Producto[]>(url);
  }
}
