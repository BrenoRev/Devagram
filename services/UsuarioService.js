import HttpService from "./HttpService";

export default class UsuarioService extends HttpService {
    constructor() {
        super();
    }

    async login(credenciais){
        const { data } = await this.post("/login", credenciais);
        localStorage.setItem('nome', data.nome);
        localStorage.setItem('email', data.email);
        localStorage.setItem('token', data.token);

        const usuario = await this.get('/usuario');
        localStorage.setItem('id', usuario.data._id);
        if(usuario.data.avatar) {
            localStorage.setItem("avatar", usuario.data.avatar);
        }
    }

    async cadastrar(usuario) {
        return this.post("/cadastro", usuario);
    }

    async atualizarPerfil(dados) {
        return this.put('/usuario', dados);
    }
    estaAutenticado(){
        return localStorage.getItem('token') !== null;
    }

    async pesquisar(termoDaPesquisa) {
        return this.get('/pesquisa?filtro=' + termoDaPesquisa);
    }

    async obterDadosUsuario(idUsuario) {
        return this.get('/pesquisa?id=' + idUsuario);
    }

    async alternarSeguir(idUsuario) {
        return this.put('/seguir' + idUsuario);
    }

    async logout() {
        localStorage.clear();
    }

    obterInformacoesDoUsuarioLogado() {
        return {
            id: localStorage.getItem('id'),
            nome: localStorage.getItem('nome'),
            email: localStorage.getItem('email'),
            avatar: localStorage.getItem('avatar')
        }
    }
}