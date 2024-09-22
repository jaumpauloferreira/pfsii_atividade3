import { Alert } from "react-bootstrap";
import FormCadDepartamento from "./Formularios/FormCadDepartamento"; // Corrigido
import TabelaDepartamento from "./Tabelas/TabelaDepartamento"; // Corrigido
import Pagina from "../Templates/Pagina";
import { useEffect, useState, useContext } from "react";
import { consultarTodos } from "../../servicos/departamentoService"; // Ajuste conforme necessário
import { ContextoUsuarioLogado } from "../../App";

export default function TelaCadastroDepartamento(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [exibirTabela, setExibirTabela] = useState(true);
    const [departamentoSelecionado, setDepartamentoSelecionado] = useState({ codigo: 0, nome: "" });
    const [modoEdicao, setModoEdicao] = useState(false);
    const [listaDeDepartamentos, setListaDeDepartamentos] = useState([]);

    useEffect(() => {
        consultarTodos(contextoUsuario.usuarioLogado.token).then((resposta) => {
            if (resposta.status) {
                setListaDeDepartamentos(resposta.listaDepartamentos);
            } else {
                alert(resposta.mensagem);
            }
        });
    }, [contextoUsuario.usuarioLogado.token]);

    return (
        <div>
            <Pagina>
                <Alert className="mt-2 mb-2 success text-center" variant="success">
                    <h2>Cadastro de Departamentos</h2>
                </Alert>
                {
                    exibirTabela ? 
                        <TabelaDepartamento 
                            listaDeDepartamentos={listaDeDepartamentos} 
                            setExibirTabela={setExibirTabela} 
                            departamentoSelecionado={departamentoSelecionado}
                            setDepartamentoSelecionado={setDepartamentoSelecionado}
                            setModoEdicao={setModoEdicao} 
                        /> 
                        : 
                        <FormCadDepartamento 
                            setExibirTabela={setExibirTabela}
                            departamentoSelecionado={departamentoSelecionado}
                            setDepartamentoSelecionado={setDepartamentoSelecionado}
                            setModoEdicao={setModoEdicao} 
                            modoEdicao={modoEdicao} 
                        />
                }
            </Pagina>
        </div>
    );
}
