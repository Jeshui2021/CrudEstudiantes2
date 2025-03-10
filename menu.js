import readline from 'readline';
import { GestorEstudiantes } from './modules/GestorEstudiantes.js';
import { reportes } from './modules/reportes.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const gestor = new GestorEstudiantes();

function mostrarMenuPrincipal() {
    console.log('\n=== Menú Principal ===');
    console.log('1. CRUD Estudiantes');
    console.log('2. Generar Reportes');
    console.log('3. Salir');
    rl.question('Seleccione una opción: ', opcion => {
        switch (opcion) {
            case '1': mostrarMenuCRUD(); break;
            case '2': mostrarMenuReportes(); break;
            case '3': rl.close(); break;
            default: mostrarMenuPrincipal();
        }
    });
}

function mostrarMenuCRUD() {
    console.log('\n--- Menú CRUD ---');
    console.log('1. Crear estudiante');
    console.log('2. Listar estudiantes');
    console.log('3. Actualizar estudiante');
    console.log('4. Eliminar estudiante');
    console.log('5. Volver');
    rl.question('Seleccione: ', opcion => {
        switch (opcion) {
            case '1': crearEstudiante(); break;
            case '2': listarEstudiantes(); break;
            case '3': actualizarEstudiante(); break;
            case '4': eliminarEstudiante(); break;
            case '5': mostrarMenuPrincipal(); break;
            default: mostrarMenuCRUD();
        }
    });
}

function mostrarMenuReportes() {
    console.log('\n--- Reportes ---');
    console.log('1. Listado de estudiantes');
    console.log('2. Buscar estudiante');
    console.log('3. Promedio por estudiante');
    console.log('4. Estudiantes con promedio > umbral');
    console.log('5. Aprobados/Reprobados por materia');
    console.log('6. Promedio general');
    console.log('7. Distribución por área');
    console.log('8. Reporte de rendimiento');
    console.log('9. Volver');
    rl.question('Seleccione: ', opcion => {
        switch (opcion) {
            case '1': 
                console.log(reportes.listadoEstudiantes(gestor.estudiantes));
                mostrarMenuReportes();
                break;
            case '2':
                rl.question('ID/Nombre: ', param => {
                    console.log(reportes.buscarEstudiante(gestor.estudiantes, param));
                    mostrarMenuReportes();
                });
                break;
            
            case '9': mostrarMenuPrincipal(); break;
            default: mostrarMenuReportes();
        }
    });
}

mostrarMenuPrincipal();
