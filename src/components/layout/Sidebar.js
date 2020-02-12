import React from 'react';


// Componentes
import NuevoProyecto from '../proyectos/NuevoProyecto';
import ListadoProyecto from '../proyectos/Listado';

const Sidebar = () => {
    return (
            <aside>
                <h1>Proyect<span>AR</span></h1>
                <NuevoProyecto />
                
                <div className="proyectos">
                    <h2>Proyectos</h2>
                    <ListadoProyecto />
                </div>
            </aside>
    );
};

export default Sidebar;