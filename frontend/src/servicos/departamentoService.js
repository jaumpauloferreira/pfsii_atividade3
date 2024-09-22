const urlBase = "http://localhost:4000/departamento";

export async function gravar(departamento, token) {
    const resposta = await fetch(urlBase, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": token
        },
        credentials: 'include',
        body: JSON.stringify(departamento)
    });
    return await resposta.json();
}

export async function alterar(departamento, token) {
    const resposta = await fetch(urlBase, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            "Authorization": token
        },
        credentials: 'include',
        body: JSON.stringify(departamento)
    });
    return await resposta.json();
}

export async function excluir(codigo, token) {
    const resposta = await fetch(`${urlBase}/${codigo}`, {
        method: "DELETE",
        headers: { 
            "Authorization": token
        },
        credentials: 'include'
    });
    return await resposta.json();
}

// Função consultarTodos - Agora exportada
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
