import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// Componentes
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import RutaPrivada from './components/rutas/rutaPrivada';
// Estados
import ProyectoState from './context/proyectos/ProyectoState';
import TareaState from './context/tareas/TareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/tokenAuth';

// Revisar si existe un token
const token = localStorage.getItem('token');
if(token){
  // tokenAuth solo coloca el token dentro de los headers
  tokenAuth(token);
}
function App() {
  
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
                <RutaPrivada exact path='/proyectos' component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
