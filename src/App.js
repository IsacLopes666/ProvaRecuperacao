
// Importacao do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Importacap de Estilo CSS padrao
import './App.css';

// Importacao das paginas
import Login from './pages/Login';
import Home from './pages/Home';
import CadastroAnimais from './pages/CadastroAnimais';
import CadastroUsuario from './pages/CadastroUsuario';
import EditarAnimal from './pages/EditarAnimal'

// Importacao dos Componentes


//Importacao do gerenciador de rotas
import {BrowserRouter, Route, Routes} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path="/animal/cadastrar" element={<CadastroAnimais />}/>
        <Route path="/usuario/cadastrar" element={<CadastroUsuario />}/>
        <Route path="/animal/editar/:id" element={<EditarAnimal/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
