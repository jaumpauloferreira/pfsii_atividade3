import { useState, useContext } from 'react';
import { Container, Form, Row, Col, Button, FloatingLabel } from 'react-bootstrap';
import { ContextoUsuarioLogado } from '../../../App';
import { gravar, alterar } from '../../../servicos/departamentoService';

export default function FormCadDepartamento(props) {
    // Inicializa o estado com o departamento selecionado, ou um objeto vazio se não houver seleção
    const [departamento, setDepartamento] = useState(props.departamentoSelecionado || { codigo: 0, nome: "" });
    const [validado, setValidado] = useState(false);
    const contextoUsuario = useContext(ContextoUsuarioLogado);

    function manipularMudanca(evento) {
        // Atualiza o estado do departamento com os novos valores dos inputs
        setDepartamento({
            ...departamento,
            [evento.target.name]: evento.target.value
        });
    }

    function manipularSubmissao(evento) {
        const token = contextoUsuario.usuarioLogado.token;
        const formulario = evento.currentTarget;

        // Evita o envio do formulário se não for válido
        if (formulario.checkValidity()) {
            if (!props.modoEdicao) {
                // Caso não esteja no modo de edição, realiza a criação do departamento
                gravar(departamento, token).then((resposta) => {
                    alert(resposta.mensagem);
                    props.setExibirTabela(true);
                }).catch((erro) => {
                    alert(erro.message);
                });
            } else {
                // Caso esteja no modo de edição, realiza a atualização do departamento
                alterar(departamento, token).then((resposta) => {
                    alert("Atualizado com sucesso!");
                    props.setModoEdicao(false);
                    props.setDepartamentoSelecionado({ codigo: 0, nome: "" });
                    setValidado(false);
                }).catch((erro) => {
                    alert(erro.message);
                });
            }
        } else {
            // Marca o formulário como inválido se não for preenchido corretamente
            setValidado(true);
        }

        evento.preventDefault();
        evento.stopPropagation();
    }

    return (
        <Container>
            <Form noValidate onSubmit={manipularSubmissao} validated={validado}>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Código:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="0"
                                    id="codigo"
                                    name="codigo"
                                    onChange={manipularMudanca}
                                    value={departamento.codigo}
                                    disabled
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">
                                Informe o código do departamento!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <FloatingLabel
                                label="Departamento:"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="text"
                                    placeholder="Informe o nome do departamento"
                                    id="nome"
                                    name="nome"
                                    onChange={manipularMudanca}
                                    value={departamento.nome}
                                    required
                                />
                            </FloatingLabel>
                            <Form.Control.Feedback type="invalid">
                                Informe o nome do departamento!
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                </Row>
                <Row className='mt-2 mb-2'>
                    <Col md={1}>
                        <Button type="submit">Confirmar</Button>
                    </Col>
                    <Col md={{ offset: 1 }}>
                        <Button onClick={() => {
                            props.setExibirTabela(true);
                        }}>Voltar</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}
