const urlBase = "http://localhost:4000/login";

export async function login(usuario, senha) {
    const resposta = await fetch(urlBase, { // URL corrigida
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, senha })
    });

    if (!resposta.ok) { // Verifica se a resposta não está ok
        throw new Error(`Erro na requisição: ${resposta.statusText}`);
    }

    return await resposta.json();
}
