import Link from 'next/link'
import Image from 'next/image'

import Avatar from '../avatar'
import imgCurtir from '../../public/images/curtir.svg'
import imgCurtido from '../../public/images/curtido.svg'
import imgComentarioAtivo from '../../public/images/comentarioAtivo.svg'
import imgComentarioCinza from '../../public/images/comentarioCinza.svg'

export default function Postagem({
    usuario,
    fotoDoPost,
    descricao,
    comentarios
}) {
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
                        src={imgComentarioCinza}
                        alt='Comentar'
                        width={20}
                        height={20}
                        onClick={() => console.log('Comentar')}
                    />

                    <span className='quantidadeCurtidas'>
                        Curtido por <strong>32 pessoas</strong>
                    </span>
                </div>

                <div className='descricaoDaPostagem'>
                    <strong className='nomeUsuario'>{usuario.nome}</strong>
                    <p className='descricao'>
                        {descricao}
                    </p>
                </div>

                <div className='comentariosDaPublicacao'>
                    {comentarios.map( (comentario, indice) => (
                        <div className='comentario' key={indice}>
                            <strong className='nomeUsuario'>{comentario.nome}</strong>
                            <p className='descricao'>{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}