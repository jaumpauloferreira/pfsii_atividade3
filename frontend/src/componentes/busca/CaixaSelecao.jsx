import { useEffect, useState } from "react";
import { Container, Col, Form, Row, Spinner } from "react-bootstrap";

// Depende de componentes estilizados pelo bootstrap
// enderecoFonteDados: informa qual a url que a caixa de seleção utilizará para recuperar os dados
// campoChave: Nos dados, qual campo é a chave primária
// campoExibicao: Qual coluna deve ser exibida pela caixa de seleção
// funcaoSelecao : Que é a função que receberá o objeto selecionado pelo usuário
export default function CaixaSelecao({
    enderecoFonteDados,
    campoChave,
    campoExibicao,
    funcaoSelecao,
    localLista,
    tokenAcesso,
}) {
    const [valorSelecionado, setValorSelecionado] = useState(null);
    const [carregandoDados, setCarregandoDados] = useState(false);
    const [dados, setDados] = useState([]);

    useEffect(() => {
        setCarregandoDados(true);
        let config;
        if (tokenAcesso) {
            config = {
                method: "GET",
                headers: {
                    Authorization: tokenAcesso,
                },
                credentials: "include",
            };
        } else {
            config = { method: "GET", credentials: "include" };
        }

        fetch(enderecoFonteDados, config)
            .then((resposta) => {
                if (resposta.ok) {
                    return resposta.json();
                } else {
                    return [
                        {
                            [campoChave]: 0,
                            [campoExibicao]: "Não foi possível obter os dados do backend",
                        },
                    ];
                }
            })
            .then((listaDados) => {
                setCarregandoDados(false);
                if (localLista) {
                    setDados(listaDados[localLista]);
                } else {
                    setDados(listaDados);
                }
                // Lembrar que a caixa de seleção possui um valor previamente selecionado
                if (listaDados.length > 0) {
                    setValorSelecionado(listaDados[0]);
                    funcaoSelecao(listaDados[0]);
                }
            })
            .catch((erro) => {
                setCarregandoDados(false);
                setDados([
                    {
                        [campoChave]: 0,
                        [campoExibicao]:
                            "Não foi possível obter os dados do backend: " +
                            erro.message,
                    },
                ]);
            });
    }, [enderecoFonteDados, campoChave, campoExibicao, funcaoSelecao, localLista, tokenAcesso]);

    return (
        <Container border>
            <Row>
                <Col md={11}>
                    <Form.Select
                        value={valorSelecionado ? valorSelecionado[campoChave] : ""}
                        onChange={(evento) => {
                            const itemSelecionado = evento.currentTarget.value;
                            // Gera uma lista de ids e encontra o índice do item selecionado
                            const pos = dados
                                .map((item) => item[campoChave].toString())
                                .indexOf(itemSelecionado);
                            if (pos !== -1) {
                                setValorSelecionado(dados[pos]);
                                funcaoSelecao(dados[pos]);
                            }
                        }}
                    >
                        {dados?.map((item) => {
                            return (
                                <option key={item[campoChave]} value={item[campoChave]}>
                                    {item[campoExibicao]}
                                </option>
                            );
                        })}
                    </Form.Select>
                </Col>
                <Col md={1}>
                    <Spinner className={carregandoDados ? "d-block" : "d-none"} />
                </Col>
            </Row>
        </Container>
    );
}
