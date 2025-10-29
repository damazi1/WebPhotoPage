import './App.css'
import Login from './Components/Login'
import Register from './Components/Register';
import Home from './Components/Home';
import Informacje from './Components/Informacje';
import Explore from './Components/Explore';
import Profile from './Components/Profile';
import UserList from './Components/UserList';
import { Routes, Route, Link } from "react-router-dom";
import {useState} from 'react'
import PrivateRoute from './Scripts/PrivateRoute';
import UserProfile from './Components/UserProfile';

function App() {
const [isLoggedIn, setIsLoggedIn] = useState(false);

function logout() {
  setIsLoggedIn(false)
  window.location.href = "/";
  localStorage.setItem("isLoggedIn","false")
}
  return (
    <div>
      <nav className='navbar-app'>
        <div className='Main'>
          <img src='main/logo.png'></img>
          <Link to="/">Main</Link>
          <Link to="/Explore">Explore</Link>
          <Link to="/Information">Informacje</Link>
          <Link to="/Profile">Profile</Link>
          <Link to="/UserList">Users</Link>
        </div>
        <span style={{ width: "30vw" }}></span>
        <div className='User'>
          {isLoggedIn}
          { localStorage.getItem("isLoggedIn")=="false" &&<Link className='Log-in' to="/Login">Logowanie</Link>}
          { localStorage.getItem("isLoggedIn")=="false" &&<Link className='Sign-up' to="/Register">Rejestracja</Link>}
          { localStorage.getItem("isLoggedIn")=="true" && <button className='Log-out' onClick={()=>logout()}>Wyloguj</button>}
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Information" element={<Informacje />} />
                {/* Chronione trasy */}
        <Route path="/Profile" element={
          <PrivateRoute><Profile /></PrivateRoute>
        }/>
        <Route path="/UserList" element={
          <PrivateRoute><UserList /></PrivateRoute>
        }/>
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
