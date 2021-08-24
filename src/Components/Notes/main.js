import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Notes from './index';
import RadioButton from '../../Components/RadioButton/index';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import '../../app.css';
import '../../global.css';
import './sidebars.css';
import '../../main.css';

function Main({ auth, setAuth }) {

    const [selectedValue, setSelectedValue] = useState('all');
    const [title, setTitle] = useState('');
    const [notes, setNotes] = useState('');
    const [allNotes, setAllNotes] = useState([]);
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': token
    }

    useEffect(() => {
        if (auth) {
            getAllNotes();
        }
    }, [auth]);

    async function getAllNotes() {
        if (token) {

            await api.get('/annotations', { headers }).then((response) => {
                if (response.data.auth)
                    localStorage.setItem('token', response.data.token);
                setAllNotes(response.data.annotationList);
            }).catch((error) => {
                setAuth(false);
                localStorage.clear();
            });
        }
    }

    async function loadNotes(option) {
        await api.get(`/priorities?priority=${option}`, { headers })
            .then((response) => {

                if (response) {
                    if (response.data.auth)
                        localStorage.setItem('token', response.data.token);
                    setAllNotes(response.data.priorityNotes);
                }
            })
            .catch((error) => {
                localStorage.clear();
            });
    }

    async function handleChanges(e) {

        setSelectedValue(e.value);

        if (e.checked && e.value !== 'all') {
            loadNotes(e.value);
        }
        else {
            getAllNotes();
        }
    }

    async function handleDelete(id) {

        if (token) {
            await api.delete(`annotations/${id}`, { headers })
                .then((response) => {
                    if (response) {
                        if (response.data.auth)
                            localStorage.setItem('token', response.data.token);

                        setAllNotes(allNotes.filter(note => note._id !== id));
                    }
                })
                .catch((error) => {
                    localStorage.clear();
                });
        }
    }

    async function handleChangePriority(id) {

        if (token) {
            await api.put(`priorities/${id}`, null, { headers }).then((response) => {
                if (response.data.auth)
                    localStorage.setItem('token', response.data.token);
                if (response && selectedValue !== 'all') {
                    loadNotes(selectedValue);
                }
                else if (response) {
                    getAllNotes();
                }
            }).catch((erro) => {
                setAuth(false);
                localStorage.clear();
            });
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (token) {
            const response = await api.post('/annotations', {
                title,
                notes,
                priority: false
            }, { headers });

            setTitle('');
            setNotes('');

            if (selectedValue !== 'all') {
                getAllNotes();
            }
            else {
                setAllNotes([...allNotes, response.data.annotationCreated])
            }
            setSelectedValue('all');
        }
    }

    function handleLogOut() {
        localStorage.clear();
        setAuth(false);
    }

    useEffect(() => {
        function enableSubmitButton() {
            let btn = document.getElementById('btn_submit');
            if (btn) {
                btn.style.background = '#FFD3CA';
                if (title && notes) {
                    btn.style.background = "#EB8F7A"
                }
            }
        }
        enableSubmitButton()
    }, [title, notes])

    return (
        <>
            <div className="header">
                <h4 style={{ textAlign: "right", textTransform: "uppercase", margin: "auto" }}>Bem-vindo(a) {localStorage.getItem('name')}</h4>
                <ExitToAppIcon style={{ textAlign: "right" }} onClick={() => { handleLogOut() }} color="action" />
            </div>
            <div id="app">
                <aside>
                    <strong>Caderno de Notas</strong>
                    <form onSubmit={handleSubmit}>

                        <div className="input-block">
                            <label htmlFor="title">Titulo da Anotação</label>
                            <input
                                required
                                maxLength="30"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="input-block">
                            <label htmlFor="nota">Anotações</label>
                            <textarea
                                required
                                value={notes}
                                onChange={e => setNotes(e.target.value)}
                            />
                        </div>

                        <button id="btn_submit" type="submit">Salvar</button>
                    </form>
                    <RadioButton
                        selectedValue={selectedValue}
                        handleChanges={handleChanges}
                    />
                </aside>
                <main>
                    <ul>
                        {allNotes.map(data => (
                            <Notes
                                key={data._id}
                                data={data}
                                handleDelete={handleDelete}
                                handleChangePriority={handleChangePriority}
                            />
                        ))}
                    </ul>
                </main>
            </div>
        </>

    )
}
export default Main;