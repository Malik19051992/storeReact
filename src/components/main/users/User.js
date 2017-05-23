import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../Loading'

export default function User({user}) {
    if (!user)
        return <Loading/>
    else {
        return (
            <div className="main-content">
                <table className="data-table">
                    <tbody>
                    <tr>
                        <th>Имя пользователя</th>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <th>Логин пользователя</th>
                        <td>{user.login}</td>
                    </tr>
                    <tr>
                        <th>Пароль пользователя</th>
                        <td>{user.password}</td>
                    </tr>
                    <tr>
                        <th>Тип атрибута</th>
                        <td>{user.role.toString() === '0' ? 'Администратор' : user.role.toString() === '1' ? 'Модератор' : 'Пользователь'}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
