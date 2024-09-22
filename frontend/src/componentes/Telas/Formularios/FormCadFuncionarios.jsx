import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState, useContext } from 'react';
import { ContextoUsuarioLogado } from '../../../App';
import { alterar, gravar } from '../../../servicos/funcionarioService';

export default function FormCadFuncionarios(props) {
    const contextoUsuario = useContext(ContextoUsuarioLogado);
    const [funcionario, setFuncionario] = useState(props.funcionarioSelecionado);
    const [validado, setValidado] = useState(false);

    function manipularMudanca(evento) {
        setFuncionario({
            ...funcionario,
            [evento.target.name]: evento.target.value
        });
    }

    function manipularSubmissao(evento) {
        evento.preventDefault(); // Previne o comportamento padrão do formulário
        const token = contextoUsuario.usuarioLogado.token;
        const formulario = evento.currentTarget;

        if (formulario.checkValidity()) {
            const acao = props.modoEdicao ? alterar : gravar;

            acao(funcionario, token)
                .then((resposta) => {
                    alert(resposta.mensagem);
                    if (resposta.status) {
                        props.setExibirTabela(true);
                        if (props.modoEdicao) {
                            props.setModoEdicao(false);
                            resetarFormulario();
                        }
                    }
                })
                .catch((erro) => {
                    alert("Erro ao enviar a requisição: " + erro.message);
                });
                
            setValidado(false);
        } else {
            setValidado(true);
        }
    }

    function resetarFormulario() {
        setFuncionario({
            codigo: 0,
            nome: "",
            dataAdmissao: "",
            cargo: "",
            departamento: ""
        });
        props.setFuncionarioSelecionado({
            codigo: 0,
            nome: "",
            dataAdmissao: "",
            cargo: "",
            departamento: ""
        });
    }

    return (
        <Form noValidate validated={validado} onSubmit={manipularSubmissao}>
            <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="codigo">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="codigo"
                        name="codigo"
                        value={funcionario.codigo}
                        onChange={manipularMudanca}
                        disabled
                    />
                    <Form.Control.Feedback type='invalid'>
                        Por favor, informe o código do funcionário!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="12" controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        id="nome"
                        name="nome"
                        value={funcionario.nome}
                        onChange={manipularMudanca}
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o nome do funcionário!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-4">
                <Form.Group as={Col} md="4" controlId="dataAdmissao">
                    <Form.Label>Data de Admissão:</Form.Label>
                    <Form.Control
                        type="date"
                        id="dataAdmissao"
                        name="dataAdmissao"
                        value={funcionario.dataAdmissao}
                        onChange={manipularMudanca}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe a data de admissão!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="cargo">
                    <Form.Label>Cargo:</Form.Label>
                    <Form.Control
                        type="text"
                        id="cargo"
                        name="cargo"
                        value={funcionario.cargo}
                        onChange={manipularMudanca}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o cargo do funcionário!
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="departamento">
                    <Form.Label>Departamento:</Form.Label>
                    <Form.Control
                        type="text"
                        id="departamento"
                        name="departamento"
                        value={funcionario.departamento}
                        onChange={manipularMudanca}
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                        Por favor, informe o departamento do funcionário!
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className='mt-2 mb-2'>
                <Col md={1}>
                    <Button type="submit">
                        {props.modoEdicao ? 'Alterar' : 'Cadastrar'}
                    </Button>
                </Col>
                <Col md={{ offset: 1 }}>
                    <Button onClick={() => props.setExibirTabela(true)}>
                        Voltar
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
