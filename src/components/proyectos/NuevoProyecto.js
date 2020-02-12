import React, { Fragment, useState, useContext} from 'react';
import ProyectoContext from '../../context/proyectos/ProyectoContext';

const NuevoProyecto = () => {

    // Obetener el state del formulario
    const proyectoContext = useContext(ProyectoContext);
    // Primero extraigo el state y luego las funciones
    const { formulario, errorFormulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectoContext;

    const [proyecto, guardarProyecto] = useState({
        nombre: '',
    });

    // Extraer el nombre del proyecto

    const {nombre} = proyecto;

    const onChangeProyecto = e =>{
        guardarProyecto({
            ...proyecto,
            [e.target.name]: e.target.value,
        })
    }

    const onSubmitProyecto = e =>{
        e.preventDefault();

        //  validar el proyecto
        if(nombre === ''){
            mostrarError();
            return;
        }
        // agregarlo al estado
        agregarProyecto(proyecto);        
        // reiniciar el form
        guardarProyecto({
            nombre: ''
        })
    }

    const onClickFormulario = () =>{
        mostrarFormulario();
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >
                Nuevo Proyecto
            </button>

            {
                formulario 
                ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProyecto}
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre del proyecto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeProyecto}      
                            />

                            <input
                                type="submit"
                                className="btn btn-block btn-primario"
                                value="Agregar"
                            />
                        </form>
                    )
                :
                    null
            }

            { errorFormulario 
                ? 
                    <p className=" mensaje error">
                        Nombre del proyecto obligatorio
                    </p>
                :
                    null
            }
        </Fragment>
    );
};

export default NuevoProyecto;