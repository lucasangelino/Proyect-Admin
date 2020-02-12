import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../../index.css';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const Login = (props) => {

    // extraigo los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, iniciarSesion, autenticado } = authContext;

    
    useEffect( () => {

        if(autenticado){
            props.history.push('/proyectos');
        }

        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }
        // eslint-disable-next-line
    }, [mensaje, autenticado, props.history])


    const [usuario, guardarUsuario] = useState({
        email : '',
        password: ''
    });

    const { email, password} = usuario;

    const onChange = (e) =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if(email.trim() === '' || password.trim() === ''){
            mostrarAlerta('Todos los campos con obligatorios', 'alerta-error');
        }

        // Pasarlo al action
        iniciarSesion({ email, password});
    }

    return (
        <div className="login-container">
            <div className="form-usuario">
                { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
                <div className="contenedor-form sombra-dark">
                    <h1>Iniciar Sesion</h1>
                    <form
                        onSubmit={onSubmit}
                    >
                        <div className="campo-form">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="correo electronico"
                                values={email}
                                onChange={onChange}
                            />
                        </div>

                        <div className="campo-form">
                            <label htmlFor="email">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="tu contraseña"
                                values={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className="compo-form">
                            <input
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Iniciar Sesion"
                            />
                        </div>
                    </form>

                    <Link 
                        to={'/nueva-cuenta'}
                        className="enlace-cuenta"
                    >
                        No tienes cuenta?
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;