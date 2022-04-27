
import { useState } from 'react'
import Avatar from '../components/avatar';
import Botao from '../components/botao';
export default function Home() {

  return (
    <>
      <h1> Hello World </h1>
      <Avatar/>
      <Botao texto={'login'} manipularClique={() => console.log('Botão clicado')} />
    </>

  )
}
