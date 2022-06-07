import { useState } from "react";

import comAutorizacao from "../../hoc/comAutorizacao";
import CabecalhoComAcoes from "../../components/cabecalhoComAcoes";
import UploadImagem from "../../components/uploadImagem";
import imagemPublicacao from "../../public/images/imagemPublicacao.svg";
import Botao from "../../components/botao";

function Publicacao () {

    const [imagem, setImagem] = useState();
    const [inputImagem, setInputImagem] = useState();

    return (
        <div className="paginaPublicacao largura30pctDesktop">
            <CabecalhoComAcoes 
                textoEsquerda=''
                elementoDireita={''}
                titulo='Nova publicação'
            />

            <hr className='linhaDivisoria'/>

            <div className="conteudoPaginaPublicacao">
                <div className="primeiraEtapa">
                    <UploadImagem 
                        setImagem={setImagem}
                        aoSetarAReferencia={setInputImagem}
                        imagemPreviewClassName={!imagem ? 'previewImagemPublicacao' :  'previewImagemSelecionar'}
                        imagemPreview={imagem?.preview || imagemPublicacao.src}
                    />

                    <span className="desktop textoDragAndDrop">Arraste sua foto aqui</span>

                    <Botao 
                        texto='Selecionar uma imagem'
                        manipularClique={() => inputImagem?.click()}
                        
                    />
                </div>
               
            </div>   

        </div>
    )
}

export default comAutorizacao(Publicacao);