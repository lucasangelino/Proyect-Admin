import React, { Fragment, useContext } from 'react';
import Tarea from './Tarea';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import tareaContext from '../../context/tareas/TareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';


const ListadoTarea = () => {

    // Extraer proyectos del state inicial
    const proyectoContext = useContext(ProyectoContext);
    const { proyecto, elminarProyecto } = proyectoContext;

    // Obtener las tareas del proyecto
    const tareasContext = useContext(tareaContext);
    const { tareasProyecto } = tareasContext;


    // Si no hay proyecto seleccionado
    if(!proyecto){
        return <h2>Selecciona un proyecto</h2>
    }

    // Como es un arreglo tengo que hacer destructuring para extraerlo
    const [proyectoActual] = proyecto;


    const onClickElminar = () => {
        elminarProyecto(proyectoActual._id)
    }

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {
                    tareasProyecto === 0 
                    
                    ?
                        (<li className="tarea"><p>No hay tareas</p></li>)
                    :
                        <TransitionGroup>
                            {tareasProyecto.map( tarea =>{
                                return(
                                    <CSSTransition
                                        key={tarea._id}
                                        timeout={150}
                                        classNames="tarea"
                                    >
                                        <Tarea
                                                                                
                                            tarea={tarea}
                                        />
                                    </CSSTransition>
                                )
                            })}
                        </TransitionGroup>
                }
              
            </ul>

            <button
                type="button"
                className="btn btn-elmiinar"
                onClick={onClickElminar}
            >
                Eliminar Proyecto &times;
            </button>
        </Fragment>
    );
};

export default ListadoTarea;