import usuarioService from "../services/UsuarioService";

export default function comAutorizacao(Componente) {
    return (props) => {

        const router = useRouter();

        if(typeof window !== 'undefined'){
            if(!usuarioService.estaAutenticado()){
                router.replace('/');
                return null;
            }

            return <Componente {...props} />
        }

        return null;
        
    }
}