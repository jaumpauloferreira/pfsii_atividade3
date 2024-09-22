import React, { useState, createContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TelaCadastroFuncionario from './componentes/Telas/TelaCadastroFuncionario';
import TelaCadastroDepartamento from './componentes/Telas/TelaCadastroDepartamento';
import TelaMenu from './componentes/Telas/TelaMenu';
import Tela404 from './componentes/Telas/Tela404';
import TelaLogin from './componentes/Telas/TelaLogin';

// Contexto global para o usuário logado
export const ContextoUsuarioLogado = createContext(null);

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState({
    nome: "",
    logado: false,
    token: ""
  });

  return (
    
    <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      <BrowserRouter>
        <Routes>
          {/* Rotas acessíveis somente se o usuário não estiver logado */}
          {!usuarioLogado.logado ? (
            <Route path="/" element={<TelaLogin />} />
          ) : (
            <>
              <Route path="/funcionario" element={<TelaCadastroFuncionario />} />
              <Route path="/departamento" element={<TelaCadastroDepartamento />} />
              <Route path="/" element={<TelaMenu />} />
              <Route path="*" element={<Tela404 />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </ContextoUsuarioLogado.Provider>
  );
}

export default App;
