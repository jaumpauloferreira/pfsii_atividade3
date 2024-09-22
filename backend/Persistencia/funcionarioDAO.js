import Funcionario from '../Modelo/funcionario.js';
import Departamento from '../Modelo/departamento.js';
import conectar from './conexao.js';

export default class FuncionarioDAO {

    async gravar(funcionario) {
        if (funcionario instanceof Funcionario) {
            const sql = `INSERT INTO funcionario(func_nome, func_dataAdmissao,
                func_cargo, dep_codigo)
                VALUES(?,?,?,?)`;
            const parametros = [funcionario.nome, funcionario.dataAdmissao, funcionario.cargo, funcionario.departamento.codigo];

            const conexao = await conectar();
            const retorno = await conexao.execute(sql, parametros);
            funcionario.codigo = retorno[0].insertId;
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    async atualizar(funcionario) {
        if (funcionario instanceof Funcionario) {
            const sql = `UPDATE funcionario SET func_nome = ?, func_dataAdmissao = ?,
            func_cargo = ?, dep_codigo = ? WHERE func_codigo = ?`;
            const parametros = [funcionario.nome, funcionario.dataAdmissao, funcionario.cargo, funcionario.departamento.codigo ,funcionario.codigo];

            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }
    
    async excluir(funcionario) {
        if (funcionario instanceof Funcionario) {
            const sql = `DELETE FROM funcionario WHERE func_codigo = ?`;
            const parametros = [funcionario.codigo];
            const conexao = await conectar();
            await conexao.execute(sql, parametros);
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async consultar(termo) {
        if (!termo){
            termo="";
        }
        //termo é um número
        const conexao = await conectar();
        let listaFuncionarios = [];
        
        if (!isNaN(parseInt(termo))){
            //consulta pelo código do Departamento
            const sql = `SELECT 
            f.func_codigo,
            f.func_nome,
            f.func_dataAdmissao,
            f.func_cargo,
            d.dep_codigo,
            d.dep_nome
        FROM 
            funcionario f
        INNER JOIN 
            departamento d ON f.dep_codigo = d.dep_codigo
        WHERE 
            f.dep_codigo = ?
        ORDER BY 
            f.func_nome;                    
            `;
            const parametros=[termo];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const departamento = new Departamento(registro.dep_codigo, registro.dep_nome)
                const funcionario = new Funcionario(registro.func_codigo,registro.func_nome,
                                            registro.func_dataAdmissao,registro.func_cargo, departamento
                                            );
                listaFuncionarios.push(funcionario);
            }
        }
        else
        {
            //consulta pelo cargo do funcionario
            const sql = `SELECT f.func_codigo, f.func_nome,
              f.func_dataAdmissao, f.func_cargo, d.dep_codigo, d.dep_nome
              FROM funcionario f
              INNER JOIN departamento d ON f.dep_codigo = d.dep_codigo
              WHERE f.func_cargo like ?
              ORDER BY f.func_cargo`;
            const parametros=['%'+termo+'%'];
            const [registros, campos] = await conexao.execute(sql,parametros);
            for (const registro of registros){
                const departamento = new Departamento(registro.dep_codigo, registro.dep_nome)
                const funcionario = new Funcionario(registro.func_codigo,registro.func_nome,
                    registro.func_dataAdmissao,registro.func_cargo, departamento
                    );
                listaFuncionarios.push(funcionario);
            }
        }

        return listaFuncionarios;
    }
}


