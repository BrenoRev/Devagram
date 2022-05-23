import { useState, useEffect } from 'react'
import Home from '../components/home';

import Login from '../components/login';
import UsuarioService from '../services/UsuarioService';

const usuarioService = new UsuarioService();

export default function Index() {

  const [estaAutenticado, setEstaAutenticado] = useState();

  useEffect(() => {
    function isAutenticated() {
      setEstaAutenticado(
        usuarioService.estaAutenticado()
      );
    }

    isAutenticated();
  }, [])

  if(estaAutenticado) {
    return <Home/>
  }

  return (
    <Login/>
  )
}
