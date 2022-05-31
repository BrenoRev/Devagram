import { useState, useEffect } from "react";
import Postagem from "./Postagem";

export default function Feed({ usuarioLogado }) {

    const [listaDePostagens, setListaDePostagens] = useState([])

    useEffect(() => {
        console.log('carregar Feed')
        setListaDePostagens(
            [
            {
                id: '1',
                usuario: {
                    id: '1',
                    nome: 'Julia Paulino',
                    avatar: null
                },
                fotoDoPost: 'https://scontent.frec21-1.fna.fbcdn.net/v/t39.30808-6/240120053_2627950440839977_3250807845213116257_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeELfu_s08r7XwHGWUXU5NRB9NG60R89yMj00brRHz3IyOwUqmRX0_o4kO6uqN8EpBog0P9Oowh9yWDlFAxmFJ2E&_nc_ohc=e0a_r8aj68QAX-SpDET&_nc_ht=scontent.frec21-1.fna&oh=00_AT9dFj4PILQzmrUoK-M60T8mpedvKACXEdYmXWzMoFgNLg&oe=629A4F81',
                descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
                curtidas: [],
                comentarios: [{
                        nome: 'Fulano',
                        mensagem: 'Muito legal'
                    }, {
                        nome: 'Ciclano',
                        mensagem: 'Legal'
                    },
                    {
                        nome: 'Beltrano',
                        mensagem: 'Legal também'
                    }]
              
            },
            {
                id: '2',
                usuario: {
                    id: '2',
                    nome: 'Breno Silva',
                    avatar: null
                },
                fotoDoPost: 'https://avatars.githubusercontent.com/u/84048306?v=4',
                descricao: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up',
                curtidas: [],
                comentarios: [{
                    nome: 'Juan',
                    mensagem: 'Muito ruim'
                },
                {
                    nome: 'Maria',
                    mensagem: 'Ruim'
                },
                {
                    nome: 'João',
                    mensagem: 'Ruim também'
                }]
            }]
            
        )
    }, [usuarioLogado])

    return (
       <div className="feedContainer largura30pctDesktop">
           {listaDePostagens && listaDePostagens.map(dadosPostagem => (
                <Postagem key={dadosPostagem.id} {...dadosPostagem}/>
            ))}
       </div>
    )
}