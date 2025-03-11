// Reporte 1: Listado de Estudiantes (nombre y área)
export function listadoEstudiantes(estudiantes) {
    return estudiantes.map(function(est) {
      return { nombre: est.nombre, "área": est.nivel };
    });
  }
  
  // Reporte 2: Búsqueda de Estudiante por Nombre o ID
  export function buscarEstudiante(estudiantes, criterio) {
    return estudiantes.find(function(est) {
      return est.id === criterio || est.nombre.toLowerCase() === String(criterio).toLowerCase();
    });
  }
  
  // Reporte 3: Promedio de Calificaciones por Estudiante
  export function promedioPorEstudiante(estudiantes) {
    return estudiantes.map(function(est) {
      var calif = Object.values(est.calificaciones);
      var suma = calif.reduce(function(acc, val) {
        return acc + val;
      }, 0);
      var promedio = calif.length ? (suma / calif.length) : 0;
      return { nombre: est.nombre, promedio: parseFloat(promedio.toFixed(2)), "área": est.nivel };
    });
  }
  
  // Reporte 4: Estudiantes con Promedio Mayor a un Umbral
  export function estudiantesConPromedioMayor(estudiantes, umbral) {
    return promedioPorEstudiante(estudiantes).filter(function(est) {
      return est.promedio > umbral;
    });
  }
  
  // Reporte 5: Estudiantes Aprobados y Reprobados por Materia
  export function aprobadosReprobadosPorMateria(estudiantes, materia) {
    var aprobados = estudiantes.filter(function(est) {
      return est.calificaciones[materia] !== undefined && est.calificaciones[materia] >= 60;
    }).map(function(est) {
      return { nombre: est.nombre, calificación: est.calificaciones[materia], "área": est.nivel };
    });
    var reprobados = estudiantes.filter(function(est) {
      return est.calificaciones[materia] !== undefined && est.calificaciones[materia] < 60;
    }).map(function(est) {
      return { nombre: est.nombre, calificación: est.calificaciones[materia], "área": est.nivel };
    });
    return { aprobados: aprobados, reprobados: reprobados };
  }
  
  // Reporte 6: Promedio General del Grupo (opcional por nivel)
  export function promedioGeneralGrupo(estudiantes, nivel) {
    var filtrados = nivel ? estudiantes.filter(function(est) { return est.nivel === nivel; }) : estudiantes;
    var promedios = promedioPorEstudiante(filtrados);
    var suma = promedios.reduce(function(acc, est) {
      return acc + est.promedio;
    }, 0);
    var promedioGeneral = promedios.length ? (suma / promedios.length) : 0;
    return { promedioGeneral: parseFloat(promedioGeneral.toFixed(2)) };
  }
  
  // Reporte 7: Promedio General por Área de Estudio
  export function formatearPromedioPorArea(estudiantes) {
    var agrupados = estudiantes.reduce(function(acc, est) {
      var calif = Object.values(est.calificaciones);
      var suma = calif.reduce(function(a, b) { return a + b; }, 0);
      var promedio = calif.length ? (suma / calif.length) : 0;
      if (acc[est.nivel] === undefined) {
        acc[est.nivel] = { total: promedio, count: 1 };
      } else {
        acc[est.nivel].total += promedio;
        acc[est.nivel].count++;
      }
      return acc;
    }, {});
    return Object.keys(agrupados).reduce(function(result, area) {
      result[area] = parseFloat((agrupados[area].total / agrupados[area].count).toFixed(2));
      return result;
    }, {});
  }
  
  // Reporte 8: Distribución de Estudiantes por Área
  export function distribucionPorArea(estudiantes) {
    return estudiantes.reduce(function(acc, est) {
      if (acc[est.nivel] === undefined) {
        acc[est.nivel] = 1;
      } else {
        acc[est.nivel] = acc[est.nivel] + 1;
      }
      return acc;
    }, {});
  }
  
  // Reporte 9: Promedio de Cada Materia por Área de Estudio
  export function formatearPromedioMateriaPorArea(estudiantes) {
    var agrupados = estudiantes.reduce(function(acc, est) {
      var area = est.nivel;
      if (acc[area] === undefined) {
        acc[area] = {};
      }
      Object.keys(est.calificaciones).map(function(materia) {
        if (acc[area][materia] === undefined) {
          acc[area][materia] = { total: est.calificaciones[materia], count: 1 };
        } else {
          acc[area][materia].total += est.calificaciones[materia];
          acc[area][materia].count++;
        }
        return materia;
      });
      return acc;
    }, {});
    return Object.keys(agrupados).reduce(function(resultado, area) {
      resultado[area] = Object.keys(agrupados[area]).reduce(function(subRes, materia) {
        subRes[materia] = parseFloat((agrupados[area][materia].total / agrupados[area][materia].count).toFixed(2));
        return subRes;
      }, {});
      return resultado;
    }, {});
  }
  
  // Reporte 10: Mejores y Peores Estudiantes por Área (opcional por nivel)
  export function mejoresPeoresPorArea(estudiantes, nivel) {
    var filtrados = nivel ? estudiantes.filter(function(est) { return est.nivel === nivel; }) : estudiantes;
    var promedios = promedioPorEstudiante(filtrados);
    var ordenadosDesc = promedios.slice().sort(function(a, b) {
      return b.promedio - a.promedio;
    });
    var ordenadosAsc = promedios.slice().sort(function(a, b) {
      return a.promedio - b.promedio;
    });
    return { mejores: ordenadosDesc.slice(0, 2), peores: ordenadosAsc.slice(0, 2) };
  }
  
  // Reporte 11: Ranking de Estudiantes por Promedio
  export function rankingEstudiantes(estudiantes) {
    var promedios = promedioPorEstudiante(estudiantes);
    return promedios.slice().sort(function(a, b) {
      return b.promedio - a.promedio;
    });
  }
  
  // Reporte 12: Cantidad de Aprobados y Reprobados en la Clase
  export function cantidadAprobadosReprobados(estudiantes) {
    var promedios = promedioPorEstudiante(estudiantes);
    return promedios.reduce(function(acc, est) {
      if (est.promedio >= 60) {
        acc.aprobados += 1;
      } else {
        acc.reprobados += 1;
      }
      return acc;
    }, { aprobados: 0, reprobados: 0 });
  }
  
  // Reporte 13: Reporte de Rendimiento Académico
  export function reporteRendimiento(estudiantes) {
    var totalEstudiantes = estudiantes.length;
    var promedioGeneral = promedioGeneralGrupo(estudiantes).promedioGeneral;
    var promedios = promedioPorEstudiante(estudiantes);
    var mejoresEstudiantes = promedios.filter(function(est) {
      return est.promedio > 85;
    });
    var peoresEstudiantes = promedios.filter(function(est) {
      return est.promedio < 60;
    });
    return {
      totalEstudiantes: totalEstudiantes,
      promedioGeneralGrupo: promedioGeneral,
      mejoresEstudiantes: mejoresEstudiantes,
      peoresEstudiantes: peoresEstudiantes
    };
  }