import Botao from '../../components/botao';
import InputPublico from '../../components/inputPublico';
import UploadImagem from '../../components/uploadImagem';
import Link from 'next/link';
import Image from 'next/image';
import imagemLogo from '../../public/images/logo.svg';
import imagemUsuarioAtivo from '../../public/images/usuarioAtivo.svg';
import imagemEnvelope from '../../public/images/envelope.svg';
import imagemChave from '../../public/images/chave.svg';
import imagemAvatar from '../../public/images/avatar.svg';
import { validarEmail, validarSenha, validarConfirmacaoSenha, validarNome } from '../../utils/validadores';
import { useState } from 'react';

export default function Cadastro() {

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [imagem, setImagem] = useState('');

    const validarFormulario = () => {
        return (
            validarEmail(email) 
            && validarSenha(senha)
            && validarConfirmacaoSenha(senha, confirmarSenha)
            && validarNome(nome) 
        )
    }

    return (
        <section className={'paginaCadastro paginaPublica'}>
            <div className="logoContainer desktop">
                <Image
                    src={imagemLogo}
                    alt="logoTipo"
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form>

                    <UploadImagem
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={imagem?.preview || imagemAvatar.src}
                        setImagem={setImagem}

                    />

                    <InputPublico
                        imagem={imagemUsuarioAtivo}
                        texto="Nome Completo"
                        tipo="text"
                        aoAlterarValor={(event) => setNome(event.target.value)}
                        valor={nome}
                        mensagemValidacao="O nome deve ter no mínimo 2 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />

                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={(event) => setEmail(event.target.value)}
                        valor={email}
                        mensagemValidacao="O endereço informado é inválido"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={(event) => setSenha(event.target.value)}
                        valor={senha}
                        mensagemValidacao="A senha deve ter no mínimo 3 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />

                    <InputPublico
                        imagem={imagemChave}
                        texto="Confirmar Senha"
                        tipo="password"
                        aoAlterarValor={(event) => setConfirmarSenha(event.target.value)}
                        valor={confirmarSenha}
                        mensagemValidacao="As senhas precisam ser iguais"
                        exibirMensagemValidacao={senha && confirmarSenha && !validarConfirmacaoSenha(senha, confirmarSenha)}
                    />
                    <Botao
                        texto="Cadastrar"
                        tipo="submit"
                        desabilitado={!validarFormulario()}
                    />
                </form>

                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <Link href="/"> Faça seu login agora</Link>
                </div>
            </div>



        </section>
    )
}