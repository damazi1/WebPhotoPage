import './App.css'
import Login from './Components/Login.tsx'
import Register from './Components/Register.tsx';
import Home from './Components/Home.tsx';
import Informacje from './Components/Informacje.tsx';
import { Routes, Route, Link } from "react-router-dom";

function App() {

  return (
    <div>
      <nav className='navbar-app'>
        <Link to="/"> Strona główna </Link>
        <Link to="/login"> Logowanie </Link>
        <Link to="/register"> Rejestracja </Link>
        <Link to="/informacje">Informacje</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/informacje" element={<Informacje />} />
      </Routes>
    </div>
  )
}

export default App
