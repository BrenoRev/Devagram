import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import imgLogout from '../../public/images/logout.svg';
import CabecalhoComAcoes from '../../components/cabecalhoComAcoes';
import imgSetaEsquerda from '../../public/images/setaEsquerda.svg';
import UsuarioService from '../../services/UsuarioService';
import Avatar from '../avatar';
import Botao from '../botao'

const usuarioService = new UsuarioService();

export default function CabecalhoPerfil({usuario, estaNoPerfilPessoal}) {

    const [estaSeguindoOUsuario, setEstaSeguindoOUsuario] = useState(false);
    const [quantidadeSeguidores, setQuantidadeSeguidores] = useState(0);
    const router = useRouter();

    useEffect(()=> {
        if(!usuario) {
            return;
        }
        console.log(usuario);
        setEstaSeguindoOUsuario(usuario.segueEsseUsuario);
        setQuantidadeSeguidores(usuario.seguidores);
    }, [usuario])

    const obterTextoBotaoSeguir = () => {
        if(estaNoPerfilPessoal) {
            return 'Editar perfil';
        }

        if(estaSeguindoOUsuario) {
            return 'Deixar de seguir';
        }

        return 'Seguir';
    }

    const obterCorDoBotaoSeguir = () => {
        if(estaSeguindoOUsuario || estaNoPerfilPessoal) {
            return 'invertido';
        }

        return 'primaria';
    }

    const manipularCliqueBotaoSeguir = async () => {

        if(estaNoPerfilPessoal) {
           return router.push('/perfil/editar');
        }

        try{
            await usuarioService.alternarSeguir(usuario._id);
            setEstaSeguindoOUsuario(!estaSeguindoOUsuario);
            setQuantidadeSeguidores(
                estaSeguindoOUsuario ?
                quantidadeSeguidores - 1 : quantidadeSeguidores + 1);
        } catch(error) {
            alert('Não foi possível seguir/deixar de seguir o usuário');
        }
    }

    const aoClicarSetaEsquerda = () => {
        router.back();
    }

    const logout = () => {
        usuarioService.logout();
        router.replace('/'); 
    }

    const obterElementoDireitaCabecalho = () => {
        if(estaNoPerfilPessoal){
            return (
                    <Image 
                        src={imgLogout}
                        alt='Logout'
                        onClick={logout}
                        width={25}
                        height={25}
                        />
            )
        }
    }

    return (
        <div className='cabecalhoPerfil largura30pctDesktop'>
           
                <CabecalhoComAcoes
                        iconeEsquerda={estaNoPerfilPessoal ? null : imgSetaEsquerda}
                        titulo={usuario.nome}
                        aoClicarAcaoEsquerda={aoClicarSetaEsquerda}
                        elementoDireita={obterElementoDireitaCabecalho()}
                />
         

            <hr className='linhaDivisoria'/>

            <div className='statusPerfil'>
                <Avatar src={usuario.avatar}/>
                <div className='informacoesPerfil'>
                    <div className='statusContainer'>
                        <div className='status'>
                            <strong>{usuario.publicacoes}</strong>
                            <span>Publicações</span>
                        </div>

                        <div className='status'>
                            <strong>{quantidadeSeguidores}</strong>
                            <span>Seguidores</span>
                        </div>

                        <div className='status'>
                            <strong>{usuario.seguindo}</strong>
                            <span>Seguindo</span>
                        </div>
                    </div>

                    <Botao 
                        texto={obterTextoBotaoSeguir()}
                        cor={obterCorDoBotaoSeguir()}
                        manipularClique={manipularCliqueBotaoSeguir}>
                    </Botao>
                </div>
            </div>
        </div>
        
    )
}