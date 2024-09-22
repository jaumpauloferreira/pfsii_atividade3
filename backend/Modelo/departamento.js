import DepartamentoDAO from "../Persistencia/departamentoDAO.js";
//não esqueça do .js no final da importação

export default class Departamento {
    //definição dos atributos privados
    #codigo;
    #nome;

    constructor(codigo=0, nome=''){
        this.#codigo=codigo;
        this.#nome=nome;
    }

    //métodos de acesso públicos

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
        this.#nome = novoNome;
    }

    //override do método toJSON
    toJSON()     
    {
        return {
            codigo:this.#codigo,
            nome:this.#nome
        }
    }

    //camada de modelo acessa a camada de persistencia
    async gravar(){
        const depDAO = new DepartamentoDAO();
        await depDAO.gravar(this);
    }

    async excluir(){
        const depDAO = new DepartamentoDAO();
        await depDAO.excluir(this);
    }

    async atualizar(){
        const depDAO = new DepartamentoDAO();
        await depDAO.atualizar(this);

    }

    async consultar(parametro){
        const depDAO = new DepartamentoDAO();
        return await depDAO.consultar(parametro);
    }
}