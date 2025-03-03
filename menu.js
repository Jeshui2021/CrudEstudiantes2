import readline from 'readline';
import { GestorEstudiantes } from './modules/GestorEstudiantes.js';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const gestor = new GestorEstudiantes();

function mostrarMenu() {
  console.log('\n--- Menú CRUD de Estudiantes ---');
  console.log('1. Crear estudiante');
  console.log('2. Listar estudiantes');
  console.log('3. Actualizar estudiante');
  console.log('4. Eliminar estudiante');
  console.log('5. Salir');
  rl.question('Seleccione una opción: ', manejarOpcion);
}

function manejarOpcion(opcion) {
  switch (opcion) {
    case '1':
      rl.question('Nombre: ', (nombre) => {
        rl.question('Edad: ', (edad) => {
          rl.question('Nivel: ', (nivel) => {
            gestor.crear(nombre, parseInt(edad), nivel);
            console.log('Estudiante creado exitosamente.');
            mostrarMenu();
          });
        });
      });
      break;
    case '2':
      console.log('\nLista de Estudiantes:', gestor.listar());
      mostrarMenu();
      break;
    case '3':
      rl.question('ID del estudiante a actualizar: ', (id) => {
        rl.question('Nuevo Nombre: ', (nombre) => {
          rl.question('Nueva Edad: ', (edad) => {
            rl.question('Nuevo Nivel: ', (nivel) => {
              if (gestor.actualizar(parseInt(id), nombre, parseInt(edad), nivel)) {
                console.log('Estudiante actualizado exitosamente.');
              } else {
                console.log('Estudiante no encontrado.');
              }
              mostrarMenu();
            });
          });
        });
      });
      break;
    case '4':
      rl.question('ID del estudiante a eliminar: ', (id) => {
        if (gestor.eliminar(parseInt(id))) {
          console.log('Estudiante eliminado exitosamente.');
        } else {
          console.log('Estudiante no encontrado.');
        }
        mostrarMenu();
      });
      break;
    case '5':
      console.log('Saliendo del programa...');
      rl.close();
      break;
    default:
      console.log('Opción inválida. Intente de nuevo.');
      mostrarMenu();
  }
}

mostrarMenu();
