import { useState, useEffect } from 'react';
import '../Styles/Profile.css';
import Utworzone from './Utworzone';
import Zapisane from './Zapisane';

function Profile() {
  const [flag, setFlag] = useState(true);
  const [profile, setProfile] = useState({
    userId: '',
    name: '',
    email: '',
    roles: '',
  });

  useEffect(() => {
    fetch("http://localhost:8080/user/me", {
      credentials: 'include' // uwierzytelnianie ciasteczkami
    })
    .then(res => res.json())
    .then(data => setProfile(data))
    .catch(err => console.error(err));
}, []);

  return (
    <div className='prof-main'>
      <label>
        <img src={'avatar-default.webp'} alt="zdjęcie profilowe" />

        <p>{profile.name}</p>
        {/* <p>Liczba obserwujących: {profile.followers}</p> */}
        <p>Email: {profile.email}</p>
        {/* <p>Telefon: {profile.phone}</p> */}
      </label>

      <label>
        <button>Udostępnij</button>
        <button type="submit">Edytuj profil</button>
      </label>

      <label>
        <a onClick={() => setFlag(true)} style={flag ? { textDecoration: "underline" } : {}}>Utworzone</a>
        <a onClick={() => setFlag(false)} style={!flag ? { textDecoration: "underline" } : {}}>Zapisane</a>
      </label>

      {flag && <Utworzone />}
      {!flag && <Zapisane />}
    </div>
  );
}

export default Profile;
