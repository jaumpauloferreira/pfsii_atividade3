import express from 'express';
import cors from 'cors';
import rotaLogin from './Rotas/rotaLogin.js';
import rotaAutenticacao from './Rotas/rotaAutenticacao.js';
import rotaDepartamento from './Rotas/rotaDepartamento.js';
import rotaFuncionario from './Rotas/rotaFuncionario.js';
import dotenv from 'dotenv';
import session from 'express-session';
import { verificarAcesso } from './Seguranca/autenticacao.js';

// Configurações
const host = '0.0.0.0';
const porta = '4000';

dotenv.config(); // Carregar variáveis de ambiente

const app = express();

// Configura CORS para permitir solicitações do frontend e credenciais
app.use(cors({
    origin: "http://localhost:3000", // Porta do frontend
    credentials: true // Permite cookies e sessões
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configura sessão
app.use(session({
    secret: process.env.SEGREDO || 'uma_chave_secreta_qualquer', // Chave secreta para sessões
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: false,
        maxAge: 1000 * 60 * 6 // Tempo de expiração do cookie da sessão
    }
}));

// Rotas
app.use('/login', rotaLogin);
app.use('/departamento',rotaDepartamento);
app.use('/funcionario',rotaFuncionario);
app.use('/autenticacao',rotaAutenticacao);

// Inicia o servidor
app.listen(porta, host, () => {
    console.log(`Servidor escutando na porta: ${host}:${porta}.`);
});
