import React, {useReducer} from 'react';
import authReducer from './authReducer';
import authContext from './authContext';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGING_EXISOTO,
    LOGIN_ERROR,
    CERRAR_SESION
} from '../../types/index';

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Funciones
    const registrarUsuario = async datos => {
        try {
            const res = await clienteAxios.post('/api/usuarios', datos);
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: res.data
            });
            //Obtener el usuario
            usuarioAutenticado();    
        } catch (error) {
            console.log(error);
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta

            })
        }
    }

    // Retorna el usuario autenticado
    const usuarioAutenticado = async () => {
        const token = localStorage.getItem('token');
        if(token){
            tokenAuth(token);
        }
        try {
            const res = await clienteAxios.get('/api/auth');
            dispatch({
                type: OBTENER_USUARIO,
                payload: res.data.usuario
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR
            })
        }
    }

    // Iniciar sesion 
    const iniciarSesion = async datos => {
        try {
            const res = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGING_EXISOTO,
                payload: res.data
            });
            usuarioAutenticado();

        } catch (error) {
             
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta

            });
        }
    }

    // Cierra la sesion
    const cerrarSesion = () => {
        try {
            dispatch({
                type: CERRAR_SESION
            })
            usuarioAutenticado();
        } catch (error) {
            console.log(error);   
        }
    }

    return( 
        <authContext.Provider
        value={{
            token: state.token,
            autenticado: state.autenticado,
            usuario: state.usuario,
            mensaje: state.mensaje,
            cargando: state.cargando,
            registrarUsuario,
            iniciarSesion,
            usuarioAutenticado,
            cerrarSesion
        }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState;