import Departamento from "../Modelo/departamento.js";
import conectar from "./conexao.js";
//DAO = Data Access Object -> Objeto de acesso aos dados
export default class DepartamentoDAO{
    async gravar(departamento){
        if (departamento instanceof Departamento){
            const sql = "INSERT INTO departamento(dep_nome) VALUES(?)"; 
            const parametros = [departamento.nome];
            const conexao = await conectar(); //retorna uma conexão
            const retorno = await conexao.execute(sql,parametros); //prepara a sql e depois executa
            departamento.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(departamento){
        if (departamento instanceof Departamento){
            const sql = "UPDATE departamento SET dep_nome = ? WHERE dep_codigo = ?"; 
            const parametros = [departamento.nome, departamento.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async excluir(departamento){
        if (departamento instanceof Departamento){
            const sql = "DELETE FROM departamento WHERE dep_codigo = ?"; 
            const parametros = [departamento.codigo];
            const conexao = await conectar(); //retorna uma conexão
            await conexao.execute(sql,parametros); //prepara a sql e depois executa
            
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(parametroConsulta){
        let sql='';
        let parametros=[];
        //é um número inteiro?
        if (!isNaN(parseInt(parametroConsulta))){
            //consultar pelo código do departamento
            sql='SELECT * FROM departamento WHERE dep_codigo = ? order by dep_nome';
            parametros = [parametroConsulta];
        }
        else{
            //consultar pelo nome do departamento
            if (!parametroConsulta){
                parametroConsulta = '';
            }
            sql = "SELECT * FROM departamento WHERE dep_nome like ?";
            parametros = ['%'+parametroConsulta+'%'];
        }
        const conexao = await conectar();
        const [registros, campos] = await conexao.execute(sql,parametros);
        global.poolConexoes.releaseConnection(conexao);
        let listaDepartamentos = [];
        for (const registro of registros){
            const departamento = new Departamento(registro.dep_codigo,registro.dep_nome);
            listaDepartamentos.push(departamento);
        }
        return listaDepartamentos;
    }
}