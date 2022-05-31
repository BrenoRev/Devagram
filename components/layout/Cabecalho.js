import Image from 'next/image';
import { useState } from 'react';

import logoHorizontalImg from '../../public/images/logoHorizontal.svg'
import imagemLupa from '../../public/images/lupa.svg'
import Navegacao from './Navegacao';
import ResultadoPesquisa from './ResultadoPesquisa';
export default function Cabecalho() {

    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState([]);

    const aoPesquisar= (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa([]);

        if(termoPesquisado.length < 3) {
            return;
        }

            setResultadoPesquisa([
                {
                    avatar: '',
                    nome: 'Breno',
                    email: 'brenosilva@gmail.com',
                    _id: '12345'
                },
                {
                    avatar: '',
                    nome: 'Eliane',
                    email: 'eliane123@gmail.com',
                    _id: '74567'
                },
                {
                    avatar: '',
                    nome: 'Julia',
                    email: 'julia123@gmail.com',
                    _id: '234234'
                }
            ])
    }
    

    const aoClicarResultadoPesquisa = (id) => {
        console.log('clicou no resultado da pesquisa', {id});
    };

    
    return (
        <header className='cabecalhoPrincipal'>
            <div className='conteudoCabecalhoPrincipal'>
                <div className='logoCabecalhoPrincipal'>
                    <Image 
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