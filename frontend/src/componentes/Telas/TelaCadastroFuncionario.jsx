import { Alert } from "react-bootstrap";
import FormCadFuncionarios from "./Formularios/FormCadFuncionarios";
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import TabelaFuncionario from "./Tabelas/TabelaFuncionario"; // Corrigido para o nome correto
import { consultarTodos } from "../../servicos/funcionarioService";
import { ContextoUsuarioLogado } from "../../App";

export default function TelaCadastroFuncionario(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [modoEdicao, setModoEdicao] = useState(false);
    const [atualizarTela, setAtualizarTela] = useState(false);
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState({
        codigo: 0,
        nome: "",
        telefone: "",
        endereco: ""
    });
    const [listaDeFuncionarios, setListaDeFuncionarios] = useState([]);

    useEffect(() => {
        const token = contextoUsuario.usuarioLogado.token;
        consultarTodos(token)
            .then((resposta) => {
                setListaDeFuncionarios(resposta.listaFuncionarios);
            })
            .catch((erro) => {
                alert("Erro ao enviar a requisição: " + erro.message);
            });
    }, [atualizarTela, exibirTabela, contextoUsuario.usuarioLogado.token]);

    return (
        <div>
            <Pagina>
                <Alert className="mt-2 mb-2 success text-center" variant="success">
                    <h2>Cadastro de Funcionário</h2>
                </Alert>
                {exibirTabela ? (
                    <TabelaFuncionario 
                        listaDeFuncionarios={listaDeFuncionarios} 
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        setFuncionarioSelecionado={setFuncionarioSelecionado} 
                        setAtualizarTela={setAtualizarTela}
                    />
                ) : (
                    <FormCadFuncionarios 
                        setExibirTabela={setExibirTabela}
                        setModoEdicao={setModoEdicao}
                        modoEdicao={modoEdicao}
                        setFuncionarioSelecionado={setFuncionarioSelecionado}
                        funcionarioSelecionado={funcionarioSelecionado}
                        setAtualizarTela={setAtualizarTela}
                    />
                )}
            </Pagina>
        </div>
    );
}
