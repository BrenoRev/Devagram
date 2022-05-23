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
        console.log(usuario);
        localStorage.setItem('id', usuario.data._id);
        if(usuario.data.avatar) {
            localStorage.setItem("avatar", usuario.data.avatar);
        }
    }

    async cadastrar(usuario) {
        return this.post("/cadastro", usuario);
    }

    estaAutenticado(){
        return localStorage.getItem('token') !== null;
    }
}