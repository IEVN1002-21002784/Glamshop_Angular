import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IniciosSService, Usuario } from '../inicios-s.service'; // Importar el servicio correcto

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './editusuarios.component.html',
  styleUrls: ['./editusuarios.component.css'],
  imports: [CommonModule, FormsModule]
})
export default class GestionUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];           // Lista de todos los usuarios
  usuarioSeleccionado?: Usuario;      // Usuario actualmente seleccionado para editar

  constructor(private iniciosService: IniciosSService) {}

  ngOnInit(): void {
    // Llamar a la función para obtener todos los usuarios al inicializar el componente
    this.obtenerUsuarios();
  }

  // Obtener todos los usuarios desde el servicio
  obtenerUsuarios() {
    this.iniciosService.obtenerUsuarios() // Llama al método del servicio
      .subscribe(
        (data: Usuario[]) => {
          this.usuarios = data; // Asignar la lista de usuarios obtenidos
        },
        (error: any) => {
          console.error('Error al obtener los usuarios:', error);
        }
      );
  }

  // Seleccionar un usuario para editarlo
  seleccionarUsuario(usuario: Usuario) {
    // Hacer una copia del usuario seleccionado para evitar modificar el original hasta que se guarden los cambios
    this.usuarioSeleccionado = { ...usuario };
  }

  // Actualizar el usuario seleccionado
  actualizarUsuario() {;
  
    if (this.usuarioSeleccionado) {
      this.iniciosService.actualizarUsuario(this.usuarioSeleccionado) // Llama al método del servicio
        .subscribe(
          () => {
            alert('Usuario actualizado correctamente');
            // Refrescar la lista de usuarios para reflejar los cambios
            this.obtenerUsuarios();
            // Limpiar la selección de usuario después de la actualización
            this.usuarioSeleccionado = undefined;
          },
          (error: any) => {
            console.error('Error al actualizar el usuario:', error);
            alert('Ocurrió un error al actualizar el usuario.');
          }
        );
    }
  }

  // Eliminar un usuario
  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.iniciosService.eliminarUsuario(id)
        .subscribe(
          () => {
            alert('Usuario eliminado correctamente');
            // Refrescar la lista de usuarios para reflejar los cambios
            this.obtenerUsuarios();
          },
          (error: any) => {
            console.error('Error al eliminar el usuario:', error);
            alert('Ocurrió un error al eliminar el usuario.');
          }
        );
    }
  }
}
