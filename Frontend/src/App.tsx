import './App.css'
import Login from './Components/Login'
import Register from './Components/Register';
import Home from './Components/Home';
import Informacje from './Components/Informacje';
import Explore from './Components/Explore';
import Profile from './Components/Profile';
import UserList from './Components/UserList';
import { Routes, Route, Link } from "react-router-dom";
import PrivateRoute from './Scripts/PrivateRoute';

function App() {
  return (
    <div>
      <nav className='navbar-app'>
        <Link to="/">Logo</Link>
        <Link to="/Explore">Explore</Link>
        <Link to="/Information">Informacje</Link>
        <button className='Log-in'><Link to="/Login">Logowanie</Link></button>
        <button className='Sign-up'><Link to="/Register">Rejestracja</Link></button>
        <Link to="/Profile">Profil</Link>
        <Link to="/UserList">Userlist</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Information" element={<Informacje />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />

        {/* Chronione trasy */}
        <Route path="/Profile" element={
          <PrivateRoute><Profile /></PrivateRoute>
        }/>
        <Route path="/UserList" element={
          <PrivateRoute><UserList /></PrivateRoute>
        }/>
      </Routes>
    </div>
  )
}

export default App
