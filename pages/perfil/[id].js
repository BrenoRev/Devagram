import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Feed from '../../components/feed';
import comAutorizacao from '../../hoc/comAutorizacao';
import CabecalhoPerfil from '../../components/cabecalhoPerfil';
import UsuarioService from '../../services/UsuarioService';

const usuarioService = new UsuarioService();

function Perfil({usuarioLogado}) {

    const [usuario, setUsuario] = useState({})
    const router = useRouter();

     useEffect(() =>{
         if(router.query.id){
            (async () => {
                const { data } = await usuarioService.obterDadosUsuario(
                    estaNoPerfilPessoal() ?
                    usuarioLogado.id : router.query.id
                    );
                
                setUsuario({
                    nome: data.nome,
                    });

                    console.log(data);
            })();
        }
    }, [router.query.id])

    const estaNoPerfilPessoal = () => {
         return router.query.id === 'eu';
    }

    return (
        <div>
            <div className='paginaPerfil'>
                <CabecalhoPerfil 
                    usuarioLogado={usuarioLogado}
                    usuario={usuario}
                    estaNoPerfilPessoal={estaNoPerfilPessoal()}/>
                <Feed 
                    usuarioLogado={usuarioLogado}
                    usuarioPerfil={usuario}
                />
            </div>
        </div>
    )
} 

export default comAutorizacao(Perfil);