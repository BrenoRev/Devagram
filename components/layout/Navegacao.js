import imgHomeAtivo from '../../public/images/homeAtivo.svg';
import imgHomeCinza from '../../public/images/homeCinza.svg';
import imgPublicacaoAtivo from '../../public/images/publicacaoAtivo.svg';
import imgPublicacaoCinza from '../../public/images/publicacaoCinza.svg';
import imgUsuarioAtivo from '../../public/images/usuarioAtivo.svg';
import imgUsuarioCinza from '../../public/images/usuarioCinza.svg';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const mapaDeRotas = {
    home: {
        imagemAtivo: imgHomeAtivo,
        imagemPadrao: imgHomeCinza,
        rotasAtivacao: ['/']
    },
    publicacao: {
        imagemAtivo: imgPublicacaoAtivo,
        imagemPadrao: imgPublicacaoCinza,
        rotasAtivacao: ['/publicacao']
    },
    perfil: {
        imagemAtivo: imgUsuarioAtivo,
        imagemPadrao: imgUsuarioCinza,
        rotasAtivacao: ['/perfil/eu', '/perfil/eu/editar']
    }
}

export default function Navegacao( {className} ) {

    const router = useRouter();
    const [rotaAtiva, setRotaAtiva] = useState('home');

    useEffect(() => {
        definirRotaAtiva();
    }, [router.asPath])

    const definirRotaAtiva = () => {
        const chavesDoMapaDeRotas = Object.keys(mapaDeRotas);
        const indiceAtivo = chavesDoMapaDeRotas.findIndex(chave => {
            return mapaDeRotas[chave].rotasAtivacao.includes(window.location.pathname);
        })

        if(indiceAtivo === -1){
            setRotaAtiva('home');
        } else{
            setRotaAtiva(chavesDoMapaDeRotas[indiceAtivo]);
        }
    }
    
    const obterImagem = (nome) => {
        const rotaAtivada = mapaDeRotas[nome];

        if(rotaAtiva === nome) {
            return rotaAtivada.imagemAtivo;
        }

        return rotaAtivada.imagemPadrao;
    }

    const aoClicarNoIcone = (nomeRota) => {
        setRotaAtiva(nomeRota);
        router.push(mapaDeRotas[nomeRota].rotasAtivacao[0]);
    }

    return (
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                <li onClick={() => aoClicarNoIcone('home')}>
                    <Image 
                        src={obterImagem('home')}
                        alt="Icone home"
                        width={20}
                        height={20}
                    />
                </li>

                <li onClick={() => aoClicarNoIcone('publicacao')}>
                    <Image 
                        src={obterImagem('publicacao')}
                        alt="Icone Publicacao"
                        width={20}
                        height={20}
                    />
                </li>

                <li onClick={() => aoClicarNoIcone('perfil')}>
                    <Image 
                        src={obterImagem('perfil')}
                        alt="Icone Usuario"
                        width={20}
                        height={20}
                    />
                </li>

            </ul>
        </nav>
    );
}