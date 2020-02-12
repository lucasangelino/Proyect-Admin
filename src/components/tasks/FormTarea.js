import React, {useContext, useState, useEffect} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import tareaContext from '../../context/tareas/TareaContext';
// import { VALIDAR_TAREA } from '../../types';

const FormTarea = () => {

    // Extraer si un proyecto esta activo
    const proyectoContext = useContext(ProyectoContext);
    const { proyecto } = proyectoContext;

    const tareasContext = useContext(tareaContext);
    const { tareaSeleccionada, errorTarea, agregarTarea, validarTarea, quitarError, 
            obtenerTareas, actualizarTarea } = tareasContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect( ()=>{
        if(tareaSeleccionada !== null){
            guardarTarea(tareaSeleccionada)
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])

    // State del formulario
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    const { nombre } = tarea;

    if(!proyecto) return null;

    const [proyectoActual] = proyecto;

    // Leer el formulario

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if(nombre.trim() === ''){
            validarTarea();
            return;
        }

        if(tareaSeleccionada === null){
            // tarea nueva
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else{
            // Actualiza tarea existente
            actualizarTarea(tarea)
        }

     

        // Obtener las tareas del proyecto actual
        obtenerTareas(proyectoActual._id)

        guardarTarea({
            nombre: ''
        })

    }

    const handleFocus = () => {
        quitarError();
    }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de Tarea"
                        name="nombre"
                        onChange={handleChange}
                        value={nombre}
                        onFocus={handleFocus}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaSeleccionada ? 'Editar tarea' : 'Agregar tarea'}
                    />
                </div>

            </form>

            { errorTarea ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null}
        </div>
    );
};

export default FormTarea;