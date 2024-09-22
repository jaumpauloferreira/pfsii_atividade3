import { Router } from "express";
import { autenticar } from "../Seguranca/autenticacao.js";

const rotaLogin = new Router();

// Rota POST para autenticação
rotaLogin.post('/', (req, res) => {
    autenticar(req, res); // Chama a função de autenticação
});

export default rotaLogin;
