import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default function Categories({categories, error}) {
    if (error) {
        return <div>{error} </div>
    }
    if (!categories)
        return <div><p>Loading...</p></div>
    else {
        const rows = categories.map(function (item) {
            return (<tr key={item.id}>
                <td>{item.name}</td>
                <td><Link to={"/categories/" + item.id}>Детали</Link></td>
            </tr>)
        });
        return (
            <div>
                <table>
                    <tbody>
                    <tr>
                        <th>Название категории</th>
                        <th></th>
                    </tr>
                    {rows}
                    </tbody>
                </table>
                <button><Link to="/newCategory/">Добавить категорию</Link></button>
            </div>
        )
    }

}

