const urlBase = "http://localhost:4000/funcionario";

// Função para gravar um novo funcionário (POST)
export async function gravar(funcionario, token) {
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": token
        },
        credentials: 'include',
        body: JSON.stringify(funcionario)
    });
    return await resposta.json();
}

// Função para alterar um funcionário existente (PUT)
export async function alterar(funcionario, token) {
    const resposta = await fetch(urlBase, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": token
        },
        credentials: 'include',
        body: JSON.stringify(funcionario)
    });
    return await resposta.json();
}

// Função para excluir um funcionário (DELETE)
export async function excluir(codigoFuncionario, token) {
    const resposta = await fetch(`${urlBase}/${codigoFuncionario}`, { // Passa o código do funcionário na URL
        method: "DELETE",
        headers: { 
            "Authorization": token
        },
        credentials: 'include'
    });
    return await resposta.json();
}

// Função para consultar todos os funcionários (GET)
export async function consultarTodos(token) {
    const resposta = await fetch(urlBase, {
        method: "GET",
        headers: { 
            "Authorization": token
        },
        credentials: 'include'
    });
    return await resposta.json();
}
