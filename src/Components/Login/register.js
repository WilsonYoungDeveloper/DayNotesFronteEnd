import React, { useState } from 'react';
import api from '../../services/api';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './login.css';
import './loginbars.css';

function Register({ setCreateUser }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorName, setErrorName] = useState('');
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

    async function handleCreate(e) {

        e.preventDefault();

        if (!name || name === "" || name.length < 4)
            setErrorName("Nome inválido!");
        else
            setErrorName("");
        if (!email || email === "")
            setErrorEmail("E-mail inválido!");
        else
            setErrorEmail("");
        if (!password || email === "")
            setErrorPassword("Senha inválida!")
        else
            setErrorPassword("");

        if (!errorName && !errorEmail && !errorPassword) {

            await api.post('/users', {
                name,
                email,
                password
            }).then((response) => {
                if (response.status === 200) {
                    setCreateUser(false);
                }
                else {
                    console.log(response.error);
                }
            });
        }
    }

    return (
        <div id="create">
            <aside className="login">
                <strong>Cadastro</strong>
                <form onSubmit={handleCreate} className={classes.root} noValidate autoComplete="off">
                    <TextField
                        error={errorName ? true : false}
                        required
                        type="name"
                        id="name_create"
                        label="Nome"
                        variant="outlined"
                        style={{ width: "85%" }}
                        helperText={errorName}
                        onChange={e => setName(e.target.value)}
                    />
                    <TextField
                        error={errorEmail ? true : false}
                        required
                        type="email"
                        id="email_create"
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
                        id="password_create"
                        label="Senha"
                        variant="outlined"
                        style={{ width: "85%" }}
                        helperText={errorPassword}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button id="btn_submit_create" type="submit">Cadastrar</button>
                    <button id="btn_login_create" type="button" onClick={() => setCreateUser(false)}>Entrar</button>
                </form>
            </aside>
        </div>
    )
}
export default Register;