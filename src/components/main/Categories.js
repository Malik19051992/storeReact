import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import withTreeMenuAndNavigation from './WithTreeMenuAndNavigation';

export default function Categories({categories}) {
    const rows = categories.map(function (item, index) {
        return (<tr>
            <td>{item.name}</td>
            <td><Link to={"/categories/" + item.id}>Детали</Link></td>
        </tr>)
    });
    return (
        <table>
            <tr>
                <th>Название категории</th>
                <th></th>
            </tr>
            {rows}
        </table>
    )
}

//export const CategoriesWithTreeMenuAndNavigation = withTreeMenuAndNavigation(Categories)