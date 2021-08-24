import React, { useState } from 'react'
import { AiTwotoneDelete, AiOutlineExclamationCircle } from "react-icons/ai";
import api from "../../services/api";

import './style.css'
import './style-priority.css'

function Notes({ data, handleDelete, handleChangePriority }) {

    const [changedNotes, setChangedNote] = useState('');
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        'x-access-token': token
    };

    async function handleSave(e, notes) {

        e.style.cursor = 'default';
        e.style.boxShadow = 'none';

        if (changedNotes && changedNotes !== notes) {
            await api.put(`/annotations/${data._id}`, {
                notes: changedNotes
            }, { headers })
                .then((response) => {
                    if (response.data.auth)
                        localStorage.setItem('token', response.data.token);
                })
                .catch((error) => {
                    localStorage.clear();
                });
        }
    }

    function handleEdit(e, priority) {
        e.style.cursor = 'text';
        e.style.borderRadius = '5px';

        if (priority) {
            e.style.boxShadow = '0 0 5px white';
        }
        else {
            e.style.boxShadow = '0 0 5px gray';
        }
    }

    return (
        <div>
            <li className={data.priority ? "notepad-infos-priority" : "notepad-infos"}>
                <div>
                    <strong>{data.title}</strong>
                    <div>
                        <AiTwotoneDelete
                            size="20"
                            onClick={() => handleDelete(data._id)}
                        />
                    </div>
                </div>
                <textarea
                    defaultValue={data.notes}
                    onClick={e => handleEdit(e.target, data.priority)}
                    onChange={e => setChangedNote(e.target.value)}
                    onBlur={e => handleSave(e.target, data.notes)}
                />
                <span>
                    <AiOutlineExclamationCircle
                        size="20"
                        onClick={() => handleChangePriority(data._id)}
                    />
                </span>
            </li>
        </div>
    )
}

export default Notes;