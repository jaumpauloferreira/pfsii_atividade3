import { assinar, verificarAssinatura } from "./funcoesJWT.js";

// Função para autenticar um usuário
export function autenticar(requisicao, resposta) {
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;

    // Verifica se o usuário e senha são válidos
    if (usuario === 'admin' && senha === 'admin') {
        requisicao.session.usuarioAutenticado = usuario;
        resposta.json({
            "status": true,
            "token": assinar({ usuario })
        });
    } else {
        requisicao.session.usuarioAutenticado = null;
        resposta.status(401).json({
            "status": false,
            "mensagem": "Usuário ou senha inválidos!"
        });
    }
}

// Função para verificar acesso com base no token
export function verificarAcesso(requisicao, resposta, next) {
    const token = requisicao.headers['authorization'];
    let tokenDecodificado = '';

    // Verifica e decodifica o token se estiver presente
    if (token) {
        tokenDecodificado = verificarAssinatura(token);
    }

    // Verifica se o usuário no token é o mesmo que o autenticado na sessão
    if (tokenDecodificado.usuario.usuario === requisicao.session.usuarioAutenticado) {
        next();
    } else {
        resposta.status(401).json({
            "status": false,
            "mensagem": "Acesso não autorizado. Faça o login na aplicação!"
        });
    }
}

// Função para realizar logout
export function logout(requisicao, resposta) {
    requisicao.session.usuarioAutenticado = null;
    resposta.json({
        "status": true,
        "mensagem": "Logout realizado com sucesso!"
    });
}
