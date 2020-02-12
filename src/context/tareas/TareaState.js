// En el state importo tanto el Context como el Reducer
import React, {useReducer} from 'react';
import TareaContext from './TareaContext';
import TareaReducer from './TareaReducer';

import { TAREAS_PROYECTO, AGREGAR_TAREA, VALIDAR_TAREA, QUITAR_ERROR_TAREA, 
            ELIMINAR_TAREA, TAREA_ACTUAL, ACTUALIZAR_TAREA
        } from '../../types/index';
import clienteAxios from '../../config/axios';

const TareaState = props =>{
    const initialState = {
       
        tareasProyecto: [],
        errorTarea : false,
        tareaSeleccionada: null
    }

    // Crear el dispatch y el state
    // useReducer siempre recibe el Reducer y el state inicial
    const [state, dispatch] = useReducer(TareaReducer, initialState)
 
    // Funciones

    // Obtener las tareas de un proyecto especifico
    const obtenerTareas = async proyecto => {
        try {
            const res = await clienteAxios.get('/api/tareas/', {params: { proyecto }});
            dispatch({
                type: TAREAS_PROYECTO,
                payload: res.data.tareas
            });
        } catch (error) {
            
        }
    }

    const agregarTarea = async tarea => {
        try {
            const res = await clienteAxios.post('/api/tareas', tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: res.data.tarea
            });
        } catch (error) {
            
        }
    }

    // Valida y muestra error si es necesario
    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const quitarError = () => {
        dispatch({
            type: QUITAR_ERROR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) => {
        try {
            // Agregar backtick en la linea de abajo para pasar el id
            await clienteAxios.delete('/api/tareas/' + id, { params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            
        }
        
    }

    const actualizarTarea = async tarea =>{
        try {
            // Agregar backticks para pasat el id de tarea a la api
            const res = await clienteAxios.put('api/tareas/' + tarea._id, tarea)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: res.data.tarea
            })
        } catch (error) {
            
        }
    }
    

    // Extrae una tarea para su edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }
    

    return(
        <TareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                quitarError,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )

}

export default TareaState;