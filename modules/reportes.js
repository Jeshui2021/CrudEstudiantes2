export const reportes = {

    listadoEstudiantes: estudiantes => estudiantes.map(({ nombre, nivel }) => ({ nombre, área: nivel })),

   
    buscarEstudiante: (estudiantes, parametro) => {
        const id = Number(parametro);
        return estudiantes.find(est => 
            !isNaN(id) ? est.id === id : est.nombre === parametro
        );
    },

    
    promedioPorEstudiante: estudiantes => estudiantes.map(est => {
        const califs = Object.values(est.calificaciones);
        const promedio = califs.reduce((a, b) => a + b, 0) / califs.length || 0;
        return { 
            nombre: est.nombre, 
            promedio: Number(promedio.toFixed(1)), 
            área: est.nivel 
        };
    }),

    
    estudiantesConPromedioMayor: (estudiantes, umbral) => 
        reportes.promedioPorEstudiante(estudiantes)
            .filter(est => est.promedio > umbral),

   
    aprobadosReprobadosPorMateria: (estudiantes, materia) => {
        const conMateria = estudiantes.filter(est => est.calificaciones[materia] !== undefined);
        return {
            aprobados: conMateria.filter(est => est.calificaciones[materia] >= 60)
                .map(est => ({ nombre: est.nombre, calificación: est.calificaciones[materia], área: est.nivel })),
            reprobados: conMateria.filter(est => est.calificaciones[materia] < 60)
                .map(est => ({ nombre: est.nombre, calificación: est.calificaciones[materia], área: est.nivel }))
        };
    },

    
    promedioGeneral: estudiantes => {
        const todasCalifs = estudiantes.flatMap(est => Object.values(est.calificaciones));
        const promedio = todasCalifs.reduce((a, b) => a + b, 0) / todasCalifs.length || 0;
        return { promedioGeneral: Number(promedio.toFixed(1)) };
    },

   
    promedioPorArea: estudiantes => {
        return estudiantes.reduce((acc, est) => {
            const califs = Object.values(est.calificaciones);
            const suma = califs.reduce((a, b) => a + b, 0);
            const total = califs.length;

            if (!acc[est.nivel]) {
                acc[est.nivel] = { suma: 0, total: 0 };
            }
            acc[est.nivel].suma += suma;
            acc[est.nivel].total += total;
            return acc;
        }, {});
    },

 
    distribucionPorArea: estudiantes => 
        estudiantes.reduce((acc, est) => {
            acc[est.nivel] = (acc[est.nivel] || 0) + 1;
            return acc;
        }, {}),

   
    reporteRendimiento: estudiantes => {
        const total = estudiantes.length;
        const promedioGeneral = reportes.promedioGeneral(estudiantes).promedioGeneral;
        const estudiantesConPromedio = reportes.promedioPorEstudiante(estudiantes);
        
        return {
            totalEstudiantes: total,
            promedioGeneralGrupo: promedioGeneral,
            mejoresEstudiantes: estudiantesConPromedio.filter(est => est.promedio > 85),
            peoresEstudiantes: estudiantesConPromedio.filter(est => est.promedio < 60)
        };
    }
};