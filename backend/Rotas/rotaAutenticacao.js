import { Router } from "express";
import { autenticar, logout } from "../Seguranca/autenticacao.js";

// Cria uma nova instância do Router
const rotaAutenticacao = new Router();

// Define a rota POST para login, usando a função autenticar
rotaAutenticacao.post('/login', autenticar);

// Define a rota GET para logout, usando a função logout
rotaAutenticacao.get('/logout', logout);

export default rotaAutenticacao;


