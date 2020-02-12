import React, { useContext, useEffect } from 'react';
import Proyecto from './Proyecto';
import ProyectoContext from '../../context/proyectos/ProyectoContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import AlertaContexr from '../../context/alertas/alertaContext';

const ListadoProyectos = () => {

    // Extraer proyectos del state inicial
    const proyectoContext = useContext(ProyectoContext);
    const { mensaje, proyectos, obtenerProyectos } = proyectoContext;

    const alertaContext = useContext(AlertaContexr);
    const {alerta, mostrarAlerta } = alertaContext;


    // Siempre el useEffect tiene que ir antes de una condicion
    // es decir, siempre debe de ejecutarse. Si una funcion
    // devuelve null debe ir debajo
    useEffect( () => {
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        obtenerProyectos();
        // elimina la advertencia de que el Effect no tiene dependencias
        //eslint-disable-next-line
    },[mensaje]);

    

    
    // Revisar si proyectos tienen contenido
    if (proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p>;


    return (
        <ul className="listado-proyectos">
            {alerta ? (<div className='alerta alerta-error'>{alerta.msg}</div> ) : null }
            <TransitionGroup>
                {
                    proyectos.map( proyecto =>{
                        return(
                            <CSSTransition
                                timeout={200}
                                key={proyecto._id}
                                classNames="proyecto"
                            >
                                <Proyecto                                    
                                    proyecto={proyecto}
                                />
                            </CSSTransition>
                        )
                    })
                }
            </TransitionGroup>
        </ul>
    );
};

export default ListadoProyectos;