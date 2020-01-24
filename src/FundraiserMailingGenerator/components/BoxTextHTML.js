import React, { useState } from 'react'
import InputWithActions from './InputWithActions';

const DEFAULT_VALUE = 'Will you chip in {{amount}} to help ...?'

function BoxTextHTML(props) {
    const [text, setText] = useState(DEFAULT_VALUE);
    return (
        <div id="box-text-html">
            <InputWithActions
                value={text}
                onChange={(e) => {
                    console.log('change:', e);
                    setText(e.target.value);
                }}
            />
        </div>
    )
}

export default BoxTextHTML;