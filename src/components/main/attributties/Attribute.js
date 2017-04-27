import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default function Attribute({attribute, error}) {
    if (error) {
        return <div>{error} </div>
    }
    if (!attribute)
        return <div><p>Loading...</p></div>
    else {
        return (
            <table className="data-table">
                <tbody>
                <tr>
                    <th>Название атрибута</th>
                    <td>{attribute.name}</td>
                </tr>
                <tr>
                    <th>Тип атрибута</th>
                    <td>{attribute.type.toString() === '1' ? 'Строка' : 'Число'}</td>
                </tr>
                </tbody>
            </table>
        )
    }
}
