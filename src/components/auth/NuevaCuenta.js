import React, {useState, useContext, useEffect} from 'react';
import { Link } from 'react-router-dom';
// import Alertastate from '../../context/alertas/alertaState';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const NuevaCuenta = (props) => {

    // extraigo los valores del context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, registrarUsuario, autenticado } = authContext;

    // En caso de que haya un cambio
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
        nombre: '',
        confirmar: '',
        email : '',
        password: ''
    });

    const { nombre, confirmar, email, password} = usuario;

    const onChange = (e) =>{
        guardarUsuario({
            ...usuario,
            [e.target.name] : e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if (nombre.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            confirmar.trim() === '' ){
                mostrarAlerta('Todos los campos son obligatorios','alerta-error');
        }

        // Password de seis caracteres
        if(password.length < 6){
            mostrarAlerta('La contraseña debe tener al menos 6 caracteres','alerta-error');
            return;
        }
        // Password iguales
        if (password !== confirmar){
            mostrarAlerta('Las contraseñas deben coincidir','alerta-error');
            return;
        }
        // Pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        })
        
    }

    return (
        <div className="form-usuario">
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Crear Cuenta</h1>
                <form
                    onSubmit={onSubmit}
                >

                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre"
                            values={nombre}
                            onChange={onChange}
                        />
                    </div>


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

                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirmar contraseña</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="confirma tu contraseña"
                            values={confirmar}
                            onChange={onChange}
                        />
                    </div>

                    <div className="compo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link 
                    to={'/'}
                    className="enlace-cuenta"
                >
                    Ya tienes cuenta?
                </Link>
            </div>
        </div>
    );
};

export default NuevaCuenta;