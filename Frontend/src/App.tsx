import './App.css'
import Login from './Components/Login'
import Register from './Components/Register';
import Home from './Components/Home';
import Informacje from './Components/Informacje';
import Explore from './Components/Explore';
import Profile from './Components/Profile';
import UserList from './Components/UserList';
import { Routes, Route, Link } from "react-router-dom";
import {useState,useEffect} from 'react'
import PrivateRoute from './Scripts/PrivateRoute';
import UserProfile from './Components/UserProfile';
import { fetchUserLogout } from './Scripts/User/Logout';
import { fetchUserLogged } from './Scripts/User/LoggedUser';
import Posts from "./Components/Posts.tsx";

function App() {
 const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const user = await fetchUserLogged();
      setIsLoggedIn(!!user);
    };
    checkLogin();
  }, []);

  const logout = async () => {
    try {
      await fetchUserLogout(); // czekamy aż backend "wyloguje"
      setIsLoggedIn(false);     // aktualizujemy UI
    } catch (err) {
      console.error("Błąd podczas wylogowania", err);
    }
  };
  
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
            <Link to={"/Posts"}>Add Post</Link>
        </div>
        <span style={{ width: "30vw" }}></span>
        <div className='User'>
          { !isLoggedIn &&<Link className='Log-in' to="/Login">Logowanie</Link>}
          { !isLoggedIn &&<Link className='Sign-up' to="/Register">Rejestracja</Link>}
          { isLoggedIn && <button className='Log-out' onClick={logout}>Wyloguj</button>}
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
          <Route path="/Posts" element={<Posts />} />
      </Routes>
    </div>
  )
}

export default App
