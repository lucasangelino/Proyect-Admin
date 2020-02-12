import { REGISTRO_EXITOSO,
        REGISTRO_ERROR,
        OBTENER_USUARIO,
        LOGING_EXISOTO,
        LOGIN_ERROR,
        CERRAR_SESION
} from '../../types';


export default (state, action) => {
    switch(action.type){
        case REGISTRO_EXITOSO:
        case LOGING_EXISOTO:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                autenticado: true,
                mensaje: null,
                cargando: false
            }
        case CERRAR_SESION:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                usuario: null,
                autenticado: null
            }
        case LOGIN_ERROR:        
        case REGISTRO_ERROR:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                cargando: false,
                mensaje: action.payload
            }
        case OBTENER_USUARIO:
            return{
                ...state,
                autenticado: true,
                cargando: false,
                usuario: action.payload
            }
        default:
            return state;

    }
}