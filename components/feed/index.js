import { useState, useEffect } from "react";
import FeedService from "../../services/FeedService";
import Postagem from "./Postagem";

const feedService = new FeedService();

export default function Feed({ usuarioLogado, usuarioPerfil }) {

    const [listaDePostagens, setListaDePostagens] = useState([])

    const getDataFromFeedService = async () => {
        const { data } = await feedService.carregarPostagens(usuarioPerfil?._id);

        const postagensFormatadas = data.map((postagem) => (
            {
                id: postagem._id,
                usuario: {
                    id: postagem.userId,
                    nome: postagem?.usuario?.nome || usuarioPerfil?.nome,
                    avatar: postagem?.usuario?.avatar || usuarioPerfil?.avatar,
                },
                fotoDoPost: postagem.foto,
                descricao: postagem.descricao,
                curtidas: postagem.likes,
                comentarios: postagem.comentarios.map(c => ({
                    nome: c.nome,
                    mensagem: c.comentario
                }))
            }
        ));

        return postagensFormatadas;
    };

    useEffect( () => {
        setListaDePostagens(getDataFromFeedService())
        // setListaDePostagens(
        //     [
        //     {
        //         id: '1',
        //         usuario: {
        //             id: '6285b78fcd34bb21d5ee151e',
        //             nome: 'Julia Paulino',
        //             avatar: null
        //         },
        //         fotoDoPost: 'https://scontent.frec21-1.fna.fbcdn.net/v/t1.6435-9/138944255_2485915888376767_8721560643563055494_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_eui2=AeFd5eQLpbh5v5_x3_pfEIRA80WmuOrnfoTzRaa46ud-hCPItOtOrXe0iyPgWNzVtp8ugHeGPniRTSzRsi-lPedG&_nc_ohc=8hfaYfiRySIAX_X7UHe&_nc_oc=AQlXjvX3wXfhq_3AqUP8pOYMIw_S3vqFyrGX7_exrk2PIs5OD5IX3yDRVjKSKoCT8V0&_nc_ht=scontent.frec21-1.fna&oh=00_AT8lqVHWzCrEef_SMqZMWdU5nPX_loGafaaG2MoGJAQ7wA&oe=62C37902',
        //         descricao: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        //         curtidas: [],
        //         comentarios: [{
        //                 nome: 'Fulano',
        //                 mensagem: 'Muito legal'
        //             }, {
        //                 nome: 'Ciclano',
        //                 mensagem: 'Legal'
        //             },
        //             {
        //                 nome: 'Beltrano',
        //                 mensagem: 'Legal também'
        //             }]
              
        //     },
        //     {
        //         id: '2',
        //         usuario: {
        //             id: '2',
        //             nome: 'Breno Silva',
        //             avatar: null
        //         },
        //         fotoDoPost: 'https://avatars.githubusercontent.com/u/84048306?v=4',
        //         descricao: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up',
        //         curtidas: [],
        //         comentarios: [{
        //             nome: 'Juan',
        //             mensagem: 'Muito ruim'
        //         },
        //         {
        //             nome: 'Maria',
        //             mensagem: 'Ruim'
        //         },
        //         {
        //             nome: 'João',
        //             mensagem: 'Ruim também'
        //         }]
        //     }]
            
        // )
    }, [usuarioLogado, usuarioPerfil])

    if(!listaDePostagens.length) {
        return null;
    }

    return (
       <div className="feedContainer largura30pctDesktop">
           {listaDePostagens.map(dadosPostagem => (
                    <Postagem 
                    key={dadosPostagem.id} 
                    {...dadosPostagem}
                    usuarioLogado={usuarioLogado}
                    />
                ))
            }
       </div>
    )
}