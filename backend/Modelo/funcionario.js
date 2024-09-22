import FuncionarioDAO from "../Persistencia/funcionarioDAO.js";

export default class Funcionario{
    #codigo;
    #nome;
    #dataAdmissao;
    #cargo;
    #departamento;


    constructor(codigo=0,nome="", dataAdmissao='', cargo='',departamento={}){
        this.#codigo=codigo;
        this.#nome=nome;
        this.#dataAdmissao=dataAdmissao;
        this.#cargo=cargo;
        this.#departamento=departamento;
    }

    get codigo(){
        return this.#codigo;
    }
    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome=novoNome;
    }


    get dataAdmissao(){
        return this.#dataAdmissao;
    }

    set dataAdmissao(novaData){
        this.#dataAdmissao = novaData;
    }

    get cargo(){
        return this.#cargo;
    }

    set cargo(novoCargo){
        this.#cargo= novoCargo;
    }

    get departamento(){
        return this.#departamento;
    }

    set departamento(novoDepartamento){
        this.#departamento = novoDepartamento;
    }

    toJSON(){
        return {
            codigo:this.#codigo,
            nome:this.#nome,
            dataAdmissao:this.#dataAdmissao,
            cargo:this.#cargo,
            departamento:this.departamento
        }
    }

     //camada de modelo acessa a camada de persistencia
     async gravar(){
        const funcDAO = new FuncionarioDAO();
        await funcDAO.gravar(this);
     }
 
     async excluir(){
        const funcDAO = new FuncionarioDAO();
        await funcDAO.excluir(this);
     }
 
     async atualizar(){
        const funcDAO = new FuncionarioDAO();
        await funcDAO.atualizar(this);
     }
 
     async consultar(termo){
        const funcDAO = new FuncionarioDAO();
        return await funcDAO.consultar(termo);
     }

}