import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';

import './style.css';

const CustomRadio = withStyles({
    root: {
        color: '#FFD3CA',
        '&$checked': {
            color: '#EB8F7A',
        },
    },
    checked: {},
})((props) => <Radio color="default" {...props} />);

function RadioButton({ selectedValue, handleChanges }) {

    return (
        <div className="radioOptions">
            <div>
                <CustomRadio
                    checked={selectedValue === 'all'}
                    onChange={e => console.log(e.target)}
                    onChange={e => handleChanges(e.target)}
                    value="all"
                />
                <span>Todos</span>
            </div>
            <div>
                <CustomRadio
                    checked={selectedValue === 'true'}
                    onChange={e => console.log(e.target)}
                    onChange={e => handleChanges(e.target)}
                    value="true"
                />
                <span>Prioridade</span>
            </div>
            <div>
                <CustomRadio
                    checked={selectedValue === 'false'}
                    onChange={e => console.log(e.target)}
                    onChange={e => handleChanges(e.target)}
                    value="false"
                />
                <span>Normal</span>
            </div>
        </div>
    )
}

export default RadioButton;