
import { useState } from 'react'
import Botao from '../components/botao';
export default function Home() {

  return (
    <>
      <h1> Hello World </h1>
      <Botao texto={'login'} manipularClique={() => console.log('Botão clicado')} />
    </>

  )
}
