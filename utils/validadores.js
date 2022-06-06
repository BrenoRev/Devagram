const validarNome = (nome) => {
    return nome?.toString().length > 2;
}

const validarEmail = (email) => {
    return email?.toString().includes('@') && email?.toString().includes('.') && email?.toString().length > 5;
}

const validarSenha = (senha) => {
    return senha?.toString().length > 3;
}

const validarConfirmacaoSenha = (senha, confirmacaoSenha) => {
    return validarSenha(senha) && senha === confirmacaoSenha;
}

export {
    validarNome,
    validarEmail,
    validarSenha,
    validarConfirmacaoSenha
}