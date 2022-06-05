import { useRouter } from 'next/router'
import { useState, useEffect } from 'react';

import CabecalhoComAcoes from '../../components/cabecalhoComAcoes';
import comAutorizacao from '../../hoc/comAutorizacao';
import UploadImagem from '../../components/uploadImagem';
import imgAvatarPadrao from '../../public/images/avatar.svg';
import imgLimpar from '../../public/images/limpar.svg';
import UsuarioService from '../../services/UsuarioService';
import * as validadores from '../../utils/validadores';

const usuarioService = new UsuarioService();

function EditarPerfil({usuarioLogado}) {
    const router = useRouter();

    const [avatar, setAvatar] = useState();
    const [nome, setNome] = useState('');
    const [inputAvatar, setInputAvatar] = useState();


    useEffect(() => {

        if(!usuarioLogado) {
            return;
        }

        setNome(usuarioLogado.nome);
        setAvatar({
                preview: usuarioLogado.avatar ? usuarioLogado.avatar : imgAvatarPadrao,
            });
    }, [])

    const aoCancelarEdicao = () => {
        router.push('/perfil/eu')
    }

    const abrirSeletorDeArquivo = () => {
        inputAvatar?.click();
    }

    const atualizarPerfil = async () => {
        try {
            if(!validarNome(nome)){
                alert('Nome precisa de pelo menos 2 caracteres')
                return;
            }

            const corpoRequisicao = new FormData();

            corpoRequisicao.append('nome', nome);

            if(avatar.arquivo) {
                corpoRequisicao.append('file', avatar.arquivo);
            }

            await usuarioService.atualizarPerfil(corpoRequisicao);
            localStorage.setItem('nome', nome);

            if(avatar.arquivo) {
                localStorage.setItem('avatar', avatar.preview);
            }

            router.push('/perfil/eu');
            
        } catch ( error ) {
            alert('Erro ao atualizar perfil, tente novamente.');
        }
    }

    return (
        <div className='paginaEditarPerfil largura30pctDesktop'>
           <div className='conteudoPaginaEditarPerfil'>
               <CabecalhoComAcoes 
                titulo={'Editar Perfil'}
                aoClicarAcaoEsquerda={aoCancelarEdicao}
                textoEsquerda={'Cancelar'}
                elementoDireita={'Concluir'}
                acaoElementoDireita={atualizarPerfil}
                />
           </div>

           <hr className='linhaDivisoria'/>

           <div className='edicaoAvatar'>
            <UploadImagem 
                setImagem={setAvatar}
                imagemPreviewClassName='avatar'
                imagemPreview={avatar?.preview || imgAvatarPadrao.src}
                aoSetarAReferencia={setInputAvatar}
            />

            <span onClick={abrirSeletorDeArquivo}>
                Alterar foto do perfil
            </span>

            <hr className='linhaDivisoria'/>

            <div className='edicaoNome'>
                <label>Nome</label>
                <input 
                    type='text'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <Image 
                    src={imgLimpar}
                    alt='Limpar'
                    width={16}
                    height={16}
                    onClick={() => setNome('')}
                />
            </div>

            <hr className='linhaDivisoria'/>

           </div>
        </div>
    )
}

export default comAutorizacao(EditarPerfil);