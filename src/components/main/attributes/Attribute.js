import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../Loading'

export default function Attribute({attribute}) {
    if (!attribute)
        return <Loading/>
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
