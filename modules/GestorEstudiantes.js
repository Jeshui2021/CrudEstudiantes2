import { Estudiante } from './Estudiantes.js';

export class GestorEstudiantes {
    constructor() {
        this.estudiantes = [];
    }

    crear(nombre, edad, nivel) {
        const estudiante = new Estudiante(nombre, edad, nivel);
        this.estudiantes.push(estudiante);
    }

    listar() {
        return this.estudiantes;
    }

    obtenerPorId(id) {
        return this.estudiantes.find(est => est.id === id);
    }

    actualizar(id, nombre, edad, nivel, calificaciones = {}) {
        const estudiante = this.obtenerPorId(id);
        if (estudiante) {
            estudiante.nombre = nombre;
            estudiante.edad = edad;
            estudiante.nivel = nivel;
            Object.assign(estudiante.calificaciones, calificaciones);
            return true;
        }
        return false;
    }

    eliminar(id) {
        const index = this.estudiantes.findIndex(est => est.id === id);
        if (index !== -1) {
            this.estudiantes.splice(index, 1);
            return true;
        }
        return false;
    }
}