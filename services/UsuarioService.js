import HttpService from "./HttpService";

export default class UsuarioService extends HttpService {
    constructor() {
        super();
    }

    async login(usuario, senha){
        
    }

    async cadastrar(usuario) {
        return this.post("/usuarios", usuario);
    }
}