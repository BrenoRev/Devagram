
import { useState } from 'react'
import { useRef } from 'react';
import Avatar from '../components/avatar';
import Botao from '../components/botao';
import { UploadImagem } from '../components/uploadImagem';
export default function Home() {

  const [imagem, setImagem] = useState(null);
  const referenciaInput = useRef(null);

  return (
    <>
      <h1> Hello World </h1>

    <button onClick={ () => referenciaInput?.current.click() }> Abrir seletor de arquivo</button>
      
      <UploadImagem 
      setImagem={setImagem} 
      imagemPreview={imagem?.preview} 
      aoSetarAReferencia={(ref) => referenciaInput.current = ref}
      />

      <Avatar 
      imagem={imagem} />

      <Botao 
      texto={'login'} 
      manipularClique={() => console.log('Botão clicado')} />
    </>

  )
}
