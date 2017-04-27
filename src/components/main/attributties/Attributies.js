import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default function Categories({attributties, error}) {
    if (error) {
        return <div>{error} </div>
    }
    if (!attributties)
        return <div><p>Loading...</p></div>
    else {
        const rows = attributties.map(function (item) {
            return (<tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type.toString()==='1'?'Строка':'Число'}</td>
                <td><Link to={"/attributties/" + item.id}>Детали</Link></td>
            </tr>)
        });
        return (
            <div>
                <table className="data-table">
                    <tbody>
                    <tr>
                        <th>Название атрибута</th>
                        <th>Тип атрибута</th>
                        <th></th>
                    </tr>
                    {rows}
                    </tbody>
                </table>
                <button><Link to="/createAttribute/">Добавить атрибут</Link></button>
            </div>
        )
    }
}
