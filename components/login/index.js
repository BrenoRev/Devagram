import InputPublico from "../inputPublico";
import imagemEnvelope from "../../public/images/envelope.svg";
import imagemChave from "../../public/images/chave.svg";
import imagemLogo from "../../public/images/logo.svg";
import Image from 'next/image';
import Botao from "../botao";
import Link from "next/link";
import { validarEmail, validarSenha } from "../../utils/validadores"
import { useState } from "react";
import { useRouter } from "next/router";

import UsuarioService from "../../services/UsuarioService";

export default function Login() {
    const router = useRouter();
    const usuarioService = new UsuarioService();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);

    const validarFormulario = () => {
        return (
            validarEmail(email)
            && validarSenha(senha)
        )
    }

    const aoSubmeterFormulario = async (event) => {
        event.preventDefault();

        if (!validarFormulario())
            return;

        setEstaSubmetendo(true);

        try {
            const corpoRequisicaoLogin = {
                login: email,
                senha
            }
            await usuarioService.login(corpoRequisicaoLogin);

            router.replace('/perfil/eu');
        }
        catch (error) {
            alert(
                "Erro ao realizar o login. " + error?.response?.data?.erro)
        }
        finally {
            setEstaSubmetendo(false);
        }
    }


return (
    <section className={'paginaLogin paginaPublica'}>
        <div className="logoContainer">
            <Image
                src={imagemLogo}
                alt="logoTipo"
                layout="fill"
                className="logo"
            />
        </div>

        <div className="conteudoPaginaPublica">
            <form onSubmit={aoSubmeterFormulario}>
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
                    mensagemValidacao="A senha deve ter no mínimo 4 caracteres"
                    exibirMensagemValidacao={senha && !validarSenha(senha)}
                />

                <Botao
                    texto="Login"
                    tipo="submit"
                    desabilitado={!validarFormulario() && estaSubmetendo}
                />
            </form>

            <div className="rodapePaginaPublica">
                <p>Não possui uma conta?</p>
                <Link href="/cadastro"> Faça seu cadastro agora</Link>
            </div>


        </div>
    </section>
)
}