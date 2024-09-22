import { Button, Container, Table } from "react-bootstrap";
import { excluir } from "../../../servicos/departamentoService"; // Serviço atualizado
import { useContext } from "react";
import { ContextoUsuarioLogado } from "../../../App";

export default function TabelaDepartamento(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);

    // Função para editar um departamento
    function editarDepartamento(departamento) {
        props.setDepartamentoSelecionado(departamento);
        props.setModoEdicao(true);
        props.setExibirTabela(false);
    }

    // Função para apagar um departamento
    async function apagarDepartamento(departamento) {
        if (window.confirm("Deseja realmente excluir este departamento?")) {
            try {
                const resposta = await excluir(departamento.codigo, contextoUsuario.usuarioLogado.token);
                if (resposta.status) {
                    alert(resposta.mensagem);
                    props.consultarTodos(); // Atualiza a lista de departamentos
                } else {
                    alert(resposta.mensagem || "Erro ao excluir o departamento.");
                }
            } catch (erro) {
                alert("Erro ao enviar a requisição: " + erro.message);
            }
        }
    }

    return (
        <Container>
            <Button
                className="mb-3"
                variant="primary"
                onClick={() => props.setExibirTabela(false)}
            >
                Adicionar
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.listaDeDepartamentos?.length > 0 ? (
                            props.listaDeDepartamentos.map((departamento) => (
                                <tr key={departamento.codigo}>
                                    <td>{departamento.codigo}</td>
                                    <td>{departamento.nome}</td>
                                    <td>
                                        <Button
                                            onClick={() => editarDepartamento(departamento)}
                                            variant="warning"
                                            className="me-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                            </svg>
                                        </Button>

                                        <Button
                                            onClick={() => apagarDepartamento(departamento)}
                                            variant="danger"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                            </svg>
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center">Nenhum departamento encontrado</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
        </Container>
    );
}
