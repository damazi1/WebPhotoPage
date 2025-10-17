import '../Styles/Register.css'
function Register(){
    return (
        <div className="Panel">
            <p>Sign up</p>
            <label>
                Login: <input type="text" className=""/>
            </label>
            <label>
                Haslo: <input type="text" className=""/>
            </label>

            <label>
                E-mail: <input type="text" className=""/>
            </label>
            <label>
                <button type='submit'>Sign up</button>
            </label>
        </div>
    )
}

export default Register