import React, {Component} from 'react';

export default function ValidateErrorForm({validateErrors}) {
    const validateErrorsItems = validateErrors.map((item) =>
        <li key={item.type}>{item.message}</li>
    )
    return (<ul
        className={(validateErrors.length > 0 ? 'show-block' : 'hidden-block' ) + " error-message"}>
        {validateErrorsItems}

    </ul>)
}