import React, {useContext} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import tareaContext from '../../context/tareas/TareaContext';


const Proyecto = ({proyecto}) => {

    // Obetener el state del formulario
    const proyectoContext = useContext(ProyectoContext);
    // Primero extraigo el state y luego las funciones
    const { proyectoActual } = proyectoContext;

    // Obtener la funcion del context
    const tareasContext = useContext(tareaContext);
    const { obtenerTareas } = tareasContext;

    // Funcion para agregar el proyecto actual
    const seleccionarProyecto = id => {
        proyectoActual(id);
        obtenerTareas(id);
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => seleccionarProyecto(proyecto._id)}
            >
                {proyecto.nombre}
            </button>
        </li>
    );
};

export default Proyecto;