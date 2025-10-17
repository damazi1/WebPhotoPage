function Login(){
    return (
        <div className="Panel">
            <p>Logowanie</p>
            <label>
                Login: <input type="text" className=""/>
            </label>
            <label>
                Haslo: <input type="text" className=""/>
            </label>
            <label>
                <button type='submit'>Login</button>
            </label>
        </div>
    )
}

export default Login