import readline from 'readline';
import { GestorEstudiantes } from './modules/GestorEstudiantes.js';
import * as reportes from './modules/reportes.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const gestor = new GestorEstudiantes();

// Se agregan algunos estudiantes de muestra
gestor.crear("Ana Gómez", 20, "Gestión", { Matematicas: 91, Contabilidad: 88 });
gestor.crear("Luis García", 21, "Electrónica", { Matematicas: 58.2 });
gestor.crear("Carlos Cruz", 19, "Informática", { Matematicas: 89, Programacion: 95, Redes: 89 });
gestor.crear("Pedro Martínez", 22, "Electrónica", { Matematicas: 76 });
gestor.crear("Marta Rojas", 20, "Gestión", { Matematicas: 60.1 });

// Función para parsear la cadena de calificaciones (ejemplo: "Matematicas:89,Programacion:95")
function parseCalificaciones(input) {
  if (!input) return {};
  return input.split(',').map(function(item) {
    return item.split(':');
  }).reduce(function(acc, pair) {
    acc[pair[0].trim()] = parseFloat(pair[1].trim());
    return acc;
  }, {});
}

function mainMenu() {
  console.log('\n--- Menú Principal ---');
  console.log('1. CRUD de Estudiantes');
  console.log('2. Reportes Académicos');
  console.log('3. Salir');
  rl.question('Seleccione una opción: ', function(option) {
    switch(option) {
      case '1':
        crudMenu();
        break;
      case '2':
        reportesMenu();
        break;
      case '3':
        console.log('Saliendo del programa...');
        rl.close();
        break;
      default:
        console.log('Opción inválida.');
        mainMenu();
    }
  });
}

function crudMenu() {
  console.log('\n--- Menú CRUD de Estudiantes ---');
  console.log('1. Crear estudiante');
  console.log('2. Listar estudiantes');
  console.log('3. Actualizar estudiante');
  console.log('4. Eliminar estudiante');
  console.log('5. Volver al menú principal');
  rl.question('Seleccione una opción: ', function(option) {
    switch(option) {
      case '1':
        rl.question('Nombre: ', function(nombre) {
          rl.question('Edad: ', function(edad) {
            rl.question('Nivel: ', function(nivel) {
              rl.question('Calificaciones (ej: Matematicas:89,Programacion:95): ', function(califInput) {
                var calificaciones = parseCalificaciones(califInput);
                gestor.crear(nombre, parseInt(edad), nivel, calificaciones);
                console.log('Estudiante creado exitosamente.');
                crudMenu();
              });
            });
          });
        });
        break;
      case '2':
        console.log('\nLista de Estudiantes:', gestor.listar());
        crudMenu();
        break;
      case '3':
        rl.question('ID del estudiante a actualizar: ', function(id) {
          rl.question('Nuevo Nombre: ', function(nombre) {
            rl.question('Nueva Edad: ', function(edad) {
              rl.question('Nuevo Nivel: ', function(nivel) {
                rl.question('Nuevas Calificaciones (ej: Matematicas:89,Programacion:95): ', function(califInput) {
                  var calificaciones = parseCalificaciones(califInput);
                  if (gestor.actualizar(parseInt(id), nombre, parseInt(edad), nivel, calificaciones)) {
                    console.log('Estudiante actualizado exitosamente.');
                  } else {
                    console.log('Estudiante no encontrado.');
                  }
                  crudMenu();
                });
              });
            });
          });
        });
        break;
      case '4':
        rl.question('ID del estudiante a eliminar: ', function(id) {
          if (gestor.eliminar(parseInt(id))) {
            console.log('Estudiante eliminado exitosamente.');
          } else {
            console.log('Estudiante no encontrado.');
          }
          crudMenu();
        });
        break;
      case '5':
        mainMenu();
        break;
      default:
        console.log('Opción inválida.');
        crudMenu();
    }
  });
}

function reportesMenu() {
  console.log('\n--- Menú de Reportes Académicos ---');
  console.log('1. Listado de Estudiantes (Nombre y Área)');
  console.log('2. Buscar Estudiante por Nombre o ID');
  console.log('3. Promedio de Calificaciones por Estudiante');
  console.log('4. Estudiantes con Promedio Mayor a un Umbral');
  console.log('5. Estudiantes Aprobados y Reprobados por Materia');
  console.log('6. Promedio General del Grupo');
  console.log('7. Promedio General por Área de Estudio');
  console.log('8. Distribución de Estudiantes por Área');
  console.log('9. Promedio de Cada Materia por Área de Estudio');
  console.log('10. Mejores y Peores Estudiantes');
  console.log('11. Ranking de Estudiantes por Promedio');
  console.log('12. Cantidad de Aprobados y Reprobados en la Clase');
  console.log('13. Reporte de Rendimiento Académico');
  console.log('14. Volver al menú principal');
  rl.question('Seleccione una opción: ', function(option) {
    switch(option) {
      case '1':
        console.log('\nListado de Estudiantes:', reportes.listadoEstudiantes(gestor.listar()));
        reportesMenu();
        break;
      case '2':
        rl.question('Ingrese el nombre o ID del estudiante: ', function(criterio) {
          var buscado = reportes.buscarEstudiante(gestor.listar(), isNaN(criterio) ? criterio : parseInt(criterio));
          console.log('\nResultado de la búsqueda:', buscado);
          reportesMenu();
        });
        break;
      case '3':
        console.log('\nPromedio de Calificaciones por Estudiante:', reportes.promedioPorEstudiante(gestor.listar()));
        reportesMenu();
        break;
      case '4':
        rl.question('Ingrese el umbral: ', function(umbral) {
          console.log('\nEstudiantes con promedio mayor a ' + umbral + ':', reportes.estudiantesConPromedioMayor(gestor.listar(), parseFloat(umbral)));
          reportesMenu();
        });
        break;
      case '5':
        rl.question('Ingrese la materia: ', function(materia) {
          console.log('\nAprobados y Reprobados en ' + materia + ':', reportes.aprobadosReprobadosPorMateria(gestor.listar(), materia));
          reportesMenu();
        });
        break;
      case '6':
        rl.question('Ingrese el nivel (opcional, presione enter para todos): ', function(nivel) {
          console.log('\nPromedio General del Grupo:', reportes.promedioGeneralGrupo(gestor.listar(), nivel || null));
          reportesMenu();
        });
        break;
      case '7':
        console.log('\nPromedio General por Área de Estudio:', reportes.formatearPromedioPorArea(gestor.listar()));
        reportesMenu();
        break;
      case '8':
        console.log('\nDistribución de Estudiantes por Área:', reportes.distribucionPorArea(gestor.listar()));
        reportesMenu();
        break;
      case '9':
        console.log('\nPromedio de Cada Materia por Área de Estudio:', reportes.formatearPromedioMateriaPorArea(gestor.listar()));
        reportesMenu();
        break;
      case '10':
        rl.question('Ingrese el nivel (opcional, presione enter para todos): ', function(nivel) {
          console.log('\nMejores y Peores Estudiantes:', reportes.mejoresPeoresPorArea(gestor.listar(), nivel || null));
          reportesMenu();
        });
        break;
      case '11':
        console.log('\nRanking de Estudiantes por Promedio:', reportes.rankingEstudiantes(gestor.listar()));
        reportesMenu();
        break;
      case '12':
        console.log('\nCantidad de Aprobados y Reprobados:', reportes.cantidadAprobadosReprobados(gestor.listar()));
        reportesMenu();
        break;
      case '13':
        console.log('\nReporte de Rendimiento Académico:', reportes.reporteRendimiento(gestor.listar()));
        reportesMenu();
        break;
      case '14':
        mainMenu();
        break;
      default:
        console.log('Opción inválida.');
        reportesMenu();
    }
  });
}

mainMenu();