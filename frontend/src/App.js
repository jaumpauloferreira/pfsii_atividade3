import TelaCadastroFuncionario from "./componentes/Telas/TelaCadastroFuncionario";
import TelaCadastroDepartamento from "./componentes/Telas/TelaCadastroDepartamento";
import TelaMenu from "./componentes/Telas/TelaMenu";
import Tela404 from "./componentes/Telas/Tela404";
import TelaLogin from "./componentes/Telas/TelaLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";

// Contexto global para o usuário logado
export const ContextoUsuarioLogado = createContext(null);

function App() {
  const [usuarioLogado, setUsuarioLogado] = useState({
    nome: "",
    logado: false,
    token: ""
  });

  return (
    !usuarioLogado.logado ? 
    <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
      <TelaLogin />
    </ContextoUsuarioLogado.Provider> :
    <div className="App">
      <ContextoUsuarioLogado.Provider value={{ usuarioLogado, setUsuarioLogado }}>
        <BrowserRouter>
          <Routes>
            <Route path="/funcionario" element={<TelaCadastroFuncionario />} />
            <Route path="/departamento" element={<TelaCadastroDepartamento />} />
            <Route path="/" element={<TelaMenu />} />
            <Route path="*" element={<Tela404 />} />
          </Routes>
        </BrowserRouter>
      </ContextoUsuarioLogado.Provider>
    </div>
  );
}

export default App;
