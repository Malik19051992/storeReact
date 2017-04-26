import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default function Category({category, error}) {
    if (error) {
        return <div>{error} </div>
    }
    if (!category)
        return <div><p>Loading...</p></div>
    else {
        const attrs = category.attributties.map(item => {
            return (<tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.type}</td>
            </tr>)
        });
        return (
            < div >
                <table>
                    <tbody>
                    <tr>
                        <th>Название категории</th>
                        <td>{category.name}</td>
                    </tr>
                    </tbody>
                </table>
                <h2>Атрибуты</h2>
                <table>
                    <tbody>
                    <tr>
                        <th>Название атрибута</th>
                        <th>Тип</th>
                    </tr>
                    {attrs}
                    </tbody>
                </table>
            </div>
        )
    }
}
