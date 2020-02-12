import React, {useReducer} from 'react';
import proyectoContext from './ProyectoContext';
import ProyectoReducer from './ProyectoReducer';
import clienteAxios from '../../config/axios';
import {
            FORMULARIO_PROYECTO, 
            OBTENER_PROYECTOS, 
            AGREGAR_PROYECTO,
            VALIDAR_FORMULARIO,
            PROYECTO_ACTUAL,
            ELIMINAR_PROYECTO,
            QUITAR_ERROR,
            PROYECTO_ERROR
       } from '../../types';

const ProyectoState = props =>{

    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
        mensaje: null
    }

    // Crear un dispatch para ejecutar las acciones
    const [ state, dispath] = useReducer(ProyectoReducer, initialState);

    const mostrarFormulario = () =>{
        dispath({
            type: FORMULARIO_PROYECTO
        })
    }

    // Obtener los proyectos
    const obtenerProyectos = async () =>{
        try {
            const res = await clienteAxios.get('/api/proyectos');

            dispath({
                type: OBTENER_PROYECTOS,
                payload: res.data.proyectos
            })
        } catch (error) {
            const alerta = {
                msg: 'Hubo un errorzxczxcx',
                categoria: 'alerta-error'
            }
            dispath({
                type: PROYECTO_ERROR,
                payload: alerta
            })
        }
    }

    // Agregar nuevo proyecto
    const agregarProyecto = async proyecto =>{
        const res = await clienteAxios.post('/api/proyectos', proyecto);
        dispath({
            type: AGREGAR_PROYECTO,
            payload: res.data
        })
        try {
        
    } catch (error) {
        const alerta = {
            msg: 'Hubo un errorzxczxcx',
            categoria: 'alerta-error'
        }
        dispath({
            type: PROYECTO_ERROR,
            payload: alerta
        })
    }
    }

    // Validar el formulario
    const mostrarError = () => {
        dispath({
            type: VALIDAR_FORMULARIO
        })
    }

    // Selecciona el proyecto al hacerle click
    const proyectoActual = proyectoId => {
        dispath({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        })
    }

    // Elimina un proyecto
    const elminarProyecto = async proyectoId => {
       try {
           await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
            dispath({
                type: ELIMINAR_PROYECTO,
                payload: proyectoId
            });
       } catch (error) {
           
           const alerta = {
               msg: 'Hubo un errorzxczxcx',
               categoria: 'alerta-error'
           }
           dispath({
               type: PROYECTO_ERROR,
               payload: alerta
           })
           
       }
    }

    const quitarError = () => {
        dispath({
            type: QUITAR_ERROR
        })
    }

    return(
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mensaje: state.mensaje,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                elminarProyecto,
                quitarError
            }}
        >
            {props.children}
        </proyectoContext.Provider>
    )

}

export default ProyectoState;