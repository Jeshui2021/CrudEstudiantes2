import { Estudiante } from './Estudiantes.js';

export class GestorEstudiantes {
  constructor() {
    this.estudiantes = [];
  }

  crear(nombre, edad, nivel, calificaciones) {
    const nuevoEstudiante = new Estudiante(nombre, edad, nivel, calificaciones);
    this.estudiantes.push(nuevoEstudiante);
  }

  listar() {
    return this.estudiantes;
  }

  actualizar(id, nombre, edad, nivel, calificaciones) {
    const index = this.estudiantes.findIndex(function(est) {
      return est.id === id;
    });
    if (index !== -1) {
      // Se reemplaza el objeto completo (manteniendo el id)
      this.estudiantes[index] = { id: id, nombre: nombre, edad: edad, nivel: nivel, calificaciones: calificaciones };
      return true;
    }
    return false;
  }

  eliminar(id) {
    if (this.estudiantes.some(function(est) { return est.id === id; })) {
      this.estudiantes = this.estudiantes.filter(function(est) {
        return est.id !== id;
      });
      return true;
    }
    return false;
  }
}
