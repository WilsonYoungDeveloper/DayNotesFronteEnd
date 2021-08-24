import React, { useState } from 'react';
import api from '../../services/api';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './login.css';
import './loginbars.css';

function Login({ setCreateUser, setAuth }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }));

    const classes = useStyles();

    async function handleLogin(e) {
        e.preventDefault();

        if (!email || email === "")
            setErrorEmail("E-mail inválido!");
        else
            setErrorEmail("");
        if (!password || password === "")
            setErrorPassword("Senha inválida!")
        else
            setErrorPassword("");

        if (!errorEmail && !errorPassword) {
            await api.post('/users/login', {
                email,
                password
            }).then((response) => {

                if (!response.error) {
                    if (response.data.auth)
                        localStorage.setItem('token', response.data.token);

                    if (response.data.user) {
                        localStorage.setItem('userid', response.data.user._id);
                        localStorage.setItem('name', response.data.user.name);
                        localStorage.setItem('email', response.data.user.email);
                    }
                    setAuth(response.data.auth)
                }
            }).catch((error) => {
                console.log(error);
            });
        }

        setEmail('');
        setPassword('');
    }

    return (
        <div id="auth">
            <aside className="login">
                <strong>Entrar</strong>
                <form onSubmit={handleLogin} className={classes.root} noValidate autoComplete="off">
                    <TextField
                        error={errorEmail ? true : false}
                        required
                        type="email"
                        id="email_auth"
                        label="E-mail"
                        variant="outlined"
                        style={{ width: "85%" }}
                        helperText={errorEmail}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <TextField
                        error={errorPassword ? true : false}
                        required
                        type="password"
                        id="password_auth"
                        label="Senha"
                        variant="outlined"
                        style={{ width: "85%" }}
                        helperText={errorPassword}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button id="btn_submit_auth" type="submit">Entrar</button>
                    <button id="btn_create_auth" type="button" onClick={() => setCreateUser(true)}>Cadastre-se</button>
                </form>
            </aside>
        </div>
    )
}

export default Login;