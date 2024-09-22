import Funcionario from "../Modelo/funcionario.js";

export default class FuncionarioCtrl {

    gravar(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'POST' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const nome = dados.nome;
            const dataAdmissao = dados.dataAdmissao;
            const cargo = dados.cargo;
            const departamento = dados.departamento;
            
            if (nome && dataAdmissao && cargo && departamento) {
                const funcionario = new Funcionario(0, nome, dataAdmissao, cargo, departamento);
                //resolver a promise
                funcionario.gravar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "codigoGerado": funcionario.codigo,
                        "mensagem": "Funcionario cadastrado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao cadastrar o funcionario:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, os dados do funcionario segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método POST para cadastrar um funcionario!"
            });
        }
    }

    atualizar(requisicao, resposta) {
        resposta.type('application/json');
        if ((requisicao.method === 'PUT' || requisicao.method === 'PATCH') && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            const nome = dados.nome;
            const dataAdmissao = dados.dataAdmissao;
            const cargo = dados.cargo;
            const departamento = dados.departamento;
            if (codigo && nome && dataAdmissao && cargo && departamento) {
                const funcionario = new Funcionario(codigo, nome, dataAdmissao,
                    cargo, departamento);
                //resolver a promise
                funcionario.atualizar().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Funcionario atualizado com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar o funcionario:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe todos os dados do funcionario segundo a documentação da API!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize os métodos PUT ou PATCH para atualizar um funcionario!"
            });
        }
    }

    excluir(requisicao, resposta) {
        resposta.type('application/json');
        if (requisicao.method === 'DELETE' && requisicao.is('application/json')) {
            const dados = requisicao.body;
            const codigo = dados.codigo;
            if (codigo) {
                const funcionario = new Funcionario(codigo);
                //resolver a promise
                funcionario.excluir().then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Funcionario excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        resposta.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o funcionario:" + erro.message
                        });
                    });
            }
            else {
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Por favor, informe o código do funcionario!"
                });
            }
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método DELETE para excluir um funcionario!"
            });
        }
    }


    consultar(requisicao, resposta) {
        resposta.type('application/json');
        //express, por meio do controle de rotas, será
        //preparado para esperar um termo de busca
        let termo = requisicao.params.termo;
        if (!termo) {
            termo = "";
        }
        if (requisicao.method === "GET") {
            const produto = new Funcionario();
            produto.consultar(termo).then((listaFuncionarios) => {
                resposta.json(
                    {
                        status: true,
                        listaFuncionarios
                    });
            })
                .catch((erro) => {
                    resposta.json(
                        {
                            status: false,
                            mensagem: "Não foi possível obter os funcionarios: " + erro.message
                        }
                    );
                });
        }
        else {
            resposta.status(400).json({
                "status": false,
                "mensagem": "Por favor, utilize o método GET para consultar funcionarios!"
            });
        }
    }
}