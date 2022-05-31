import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

import logoHorizontalImg from '../../public/images/logoHorizontal.svg'
import imagemLupa from '../../public/images/lupa.svg'
import Navegacao from './Navegacao';
import ResultadoPesquisa from './ResultadoPesquisa';
import UsuarioService from '../../services/UsuarioService'

export default function Cabecalho() {

    const usuarioService = new UsuarioService();
    const router = useRouter();
    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState([]);
      
    const aoPesquisar= async (e) => {
      
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);

        if(e.target.value.length < 3) {
            return;
            setResultadoPesquisa([]);
        }

        try {
            const { data } = await usuarioService.pesquisar(termoPesquisado);
            setResultadoPesquisa(data);
        } catch (error) {
            alert('Erro ao pesquisar usuário. ' + error?.response?.data?.erro);
        }

    }
    

    const aoClicarResultadoPesquisa = (id) => {
        setResultadoPesquisa([]); 
        setTermoPesquisado('');
        router.push('/perfil/' + id);
    };

    const redirecionarParaHome = () => {
        router.push('/');
    }
    
    return (
        <header className='cabecalhoPrincipal'>
            <div className='conteudoCabecalhoPrincipal'>
                <div className='logoCabecalhoPrincipal'>
                    <Image 
                        onClick={redirecionarParaHome}
                        src={logoHorizontalImg}
                        alt='Logo da empresa'
                        layout='fill'
                    />
                </div>

                <div className='barraPesquisa'>
                    <div className='containerImagemLupa'>
                        <Image 
                            src={imagemLupa}
                            alt="Ícone de uma lupa"
                            layout='fill'
                        />
                    </div>

                    <input 
                        type={'text'}
                        placeholder={'Pesquisar'}
                        value={termoPesquisado}
                        onChange={aoPesquisar}
                    />
                </div>

                <Navegacao className='desktop'/>
            </div>

            {resultadoPesquisa.length > 0 && (
                <div className='resultadoPesquisaContainer'>
                    {resultadoPesquisa.map( r => (
                        <ResultadoPesquisa 
                            avatar={r.avatar}
                            nome={r.nome} 
                            email={r.email}
                            key={r._id}
                            id={r._id}
                            onClick={aoClicarResultadoPesquisa}
                        />
                    ))}
                </div>
            )}

        </header>
    );
}