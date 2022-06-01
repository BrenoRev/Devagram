import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import Avatar from '../avatar'
import imgCurtir from '../../public/images/curtir.svg'
import imgCurtido from '../../public/images/curtido.svg'
import imgComentarioAtivo from '../../public/images/comentarioAtivo.svg'
import imgComentarioCinza from '../../public/images/comentarioCinza.svg'
import { FazerComentario } from './FazerComentario'
import FeedService from '../../services/FeedService'


const feedService = new FeedService()

export default function Postagem({
    usuario,
    fotoDoPost,
    id,
    descricao,
    comentarios,
    usuarioLogado
}) {

    const [comentariosPostagem, setComentariosPostagem] = useState(comentarios);
    const [deveExibirSecaoParaComentar, setDeveExibirSecaoParaComentar] = useState(false);
    const tamanhoLimiteDescricao = window.innerWidth / 4;

    const comentar = async (comentario) => {
        try {
            await feedService.adicionarComentario(id, comentario);
            setDeveExibirSecaoParaComentar(false);
            setComentariosPostagem([...comentariosPostagem, 
                {nome: usuarioLogado.nome, mensagem: comentario}]);
        } catch (error) {
            console.log(error);
        }
    }

    const descricaoMaiorQueLimite = () => {
        return descricao.length > tamanhoAtualDaDescricao;
    }

    const exibirDescricaoCompleta = () => {
        setTamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER);
    }

    const obterImagemComentario = () => {
        return deveExibirSecaoParaComentar ? imgComentarioAtivo : imgComentarioCinza; 
    }

    const [tamanhoAtualDaDescricao, setTamanhoAtualDaDescricao] = useState(
        tamanhoLimiteDescricao
        );

    const obterDescricao = () => {
        let mensagem = descricao.substring(0, tamanhoAtualDaDescricao)
        if(descricao.length > tamanhoLimiteDescricao){
            mensagem += '...';
        }
        return mensagem;
    }

    return (
        <div className="postagem">
            <Link href={`/perfil/${usuario.id}`}>
                <section className='cabecalhoPostagem'>
                    <Avatar src={usuario.avatar}/>
                    <strong>{usuario.nome}</strong>
                </section>
            </Link>

            <div className='fotoDaPostagem'>
                <img src={fotoDoPost} alt='Foto da postagem'/>
            </div>

            <div className='rodapeDaPostagem'>
                <div className='acoesDoRodapeDaPostagem'>
                    <Image
                        src={imgCurtir}
                        alt='Curtir'
                        width={20}
                        height={20}
                        onClick={() => console.log('Curtir')}
                    />
                    <Image
                        src={obterImagemComentario()}
                        alt='Comentar'
                        width={20}
                        height={20}
                        onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                    />

                    <span className='quantidadeCurtidas'>
                        Curtido por <strong>32 pessoas</strong>
                    </span>
                </div>

                <div className='descricaoDaPostagem'>
                    <strong className='nomeUsuario'>{usuario.nome}</strong>
                    <p className='descricao'>
                        {obterDescricao()}
                        {descricaoMaiorQueLimite() && (
                            <span 
                                onClick={exibirDescricaoCompleta}
                                className="exibirDescricaoCompleta">
                                    mais
                            </span>
                        )}
                    </p>
                </div>

                <div className='comentariosDaPublicacao'>
                    {comentariosPostagem.map( (comentario, indice) => (
                        <div className='comentario' key={indice}>
                            <strong className='nomeUsuario'>{comentario.nome}</strong>
                            <p className='descricao'>{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>

            </div>
            {
                deveExibirSecaoParaComentar && (
                    <FazerComentario 
                        usuarioLogado={usuarioLogado}
                        comentar={comentar}
                    />
                )
            }
        </div>
    )
}