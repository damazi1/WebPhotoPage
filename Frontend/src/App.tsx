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
        <div className='Main'>
          <Link to="/">Main</Link>
          <Link to="/Explore">Explore</Link>
          <Link to="/Information">Informacje</Link>
        </div>
        
        <div className='User'>
          <Link className='Log-in' to="/Login">Logowanie</Link>
          <Link className='Sign-up' to="/Register">Rejestracja</Link>
        </div>
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
