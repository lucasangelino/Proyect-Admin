import React, { useContext } from 'react';
import tareaContext from '../../context/tareas/TareaContext';
import ProyectoContext from '../../context/proyectos/ProyectoContext';

const Tarea = ({tarea}) => {
    
    const tareasContext = useContext(tareaContext);
    const { eliminarTarea, obtenerTareas, actualizarTarea, guardarTareaActual } = tareasContext;

    const proyectoContext = useContext(ProyectoContext);
    const { proyecto } = proyectoContext;

    // Extraigo el id del proyecto
    const [proyectoActual] = proyecto;

    // Funcion que se ejecutar cuando se aprime elminar tarea
    const tareaEliminar = id =>{
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    }

    // Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.estado){
            tarea.estado = false;
        } else {
            tarea.estado = true;
        }
        actualizarTarea(tarea);
    }

    // Agregar una tarea actual cuando el usuario desea editarla
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea)
    }


    return (
        <li className="tarea sombre">
            <p>{tarea.nombre}</p>

            <div className="estado">
                {
                    tarea.estado
                    ?
                        (
                            <button
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >
                                Completo
                            </button>
                        )
                    :
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >
                           Incompleto
                        </button>
                            
                }
            </div>

            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={ () => seleccionarTarea(tarea)}
                >
                    Editar
                </button>

                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={() => tareaEliminar(tarea._id)}
                >
                    Eliminar
                </button>
            </div>
        </li>
    );
};

export default Tarea;