import {useState} from 'react'
import '../Styles/Profile.css'
import Utworzone from './Utworzone';
import Zapisane from './Zapisane';
function Profile(){

    const [flag,setFlag] = useState(true);

    return(
        <div className='prof-main'>
            <label>
                <img src="" alt="zdjecie profilowe"/>
                <p>Nazwa</p>
                <p>Ilosc obserwujacych</p>
            </label>
            <label>
                <button>Udostepnij</button>
                <button type="submit">Edytuj profil</button>
            </label>
            <label>
                <a onClick={()=>setFlag(true)} style={flag ? {textDecoration:"underline"}:{}}>Utworzone</a>
                <a onClick={()=>setFlag(false)} style={!flag ? {textDecoration:"underline"}:{}}>Zapisane</a>
            </label>
            {flag && <Utworzone/>}
            {!flag && <Zapisane/>}
        </div>
    );
}


export default Profile