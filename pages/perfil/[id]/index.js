import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Feed from '../../../components/feed';
import comAutorizacao from '../../../hoc/comAutorizacao';
import CabecalhoPerfil from '../../../components/cabecalhoPerfil';

function Perfil({usuarioLogado}) {

    const [usuario, setUsuario] = useState({})
    const router = useRouter();

    useEffect(() =>{
        setUsuario({
            nome: 'Breno Silva'
        })
    }, [router.query.id])

    return (
        <div>
            <div className='paginaPerfil'>
                <CabecalhoPerfil 
                    usuarioLogado={usuarioLogado}
                    usuario={usuario}/>
                <Feed usuarioLogado={usuarioLogado}/>
            </div>
        </div>
    )
} 

export default comAutorizacao(Perfil);