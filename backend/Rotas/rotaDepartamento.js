import { Router } from "express";
import DepartamentoCtrl from "../Controle/departamentoCtrl.js";

//rotas é o mapeamento das requisições da web para um determinado
//endpoint da aplicação

const depCtrl = new DepartamentoCtrl();
const rotaDepartamento = new Router();

rotaDepartamento
.get('/',depCtrl.consultar)
.get('/:termo', depCtrl.consultar)
.post('/',depCtrl.gravar)
.patch('/',depCtrl.atualizar)
.put('/',depCtrl.atualizar)
.delete('/',depCtrl.excluir);

export default rotaDepartamento;