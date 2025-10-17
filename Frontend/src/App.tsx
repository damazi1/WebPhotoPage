import './App.css'
import Login from './Components/Login.tsx'
import Register from './Components/Register.tsx';
import Home from './Components/Home.tsx';
import Informacje from './Components/Informacje.tsx';
import Explore from './Components/Explore.tsx';
import Profile from './Components/Profile.tsx';
import { Routes, Route, Link } from "react-router-dom";

function App() {

  return (
    <div>
      <nav className='navbar-app'>
        <Link to="/"> Logo </Link>
        <Link to="/Explore"> Explore </Link>
        <Link to="/Information">Informacje</Link>
        <button className='Log-in'><Link to="/Login"> Logowanie </Link></button>
        <button className='Sign-up'><Link to="/Register"> Rejestracja </Link></button>
        <Link to="/Profile">Profil</Link>
        
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Information" element={<Informacje />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<Profile/>}/>

      </Routes>
    </div>
  )
}

export default App
