import React, { useContext, useEffect } from 'react';
// Componentes
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tasks/FormTarea';
import ListadoTarea from '../tasks/ListadoTarea';
import AuthContext from '../../context/autenticacion/authContext';
 
const Proyectos = () => {
    // Extriago la info de autenticacion
    const authContext = useContext(AuthContext);
    const { usuarioAutenticado } = authContext;

    useEffect( () => {
        usuarioAutenticado();
        // eslint-disable-next-line
    },[usuarioAutenticado])

    return (
        <div className="contenedor-app">
            <Sidebar />


            <div className="seccion-principal">
                <Barra />
                <main>
                    <FormTarea />
                    <div className="contenedor-tareas">
                        <ListadoTarea />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Proyectos;