import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../resources/css/nav.css'

class Navigation extends Component {
    render() {
        return (
            <nav>
                <ul id="nav-menu">
                    <li><Link to='/'>Главная</Link></li>
                    <li><Link to='/'>Администрирование</Link>
                        <ul>
                            <li><Link to='/attributes'>Атрибуты</Link>
                                <ul>
                                    <li><Link to='/createAttribute/'>Добавить атрибут</Link></li>
                                </ul>
                            </li>
                            <li><Link to='/categories/'>Категории</Link>
                                <ul>
                                    <li><Link to='/createCategory/'>Добавить категорию</Link></li>
                                </ul>
                            </li>
                            <li><Link to='/goods/'>Товары</Link>
                                <ul>
                                    <li><Link to='/createGood/'>Добавить товар</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li><Link to='/'>Регистрация</Link></li>
                    <li><Link to='/'>Статистика продаж</Link></li>
                    <li><Link to='/'>О Сайте</Link></li>
                    <li><Link to='/'>Контакты</Link></li>
                </ul>
            </nav>
        );
    }
}

export default Navigation;