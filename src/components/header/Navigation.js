import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../resources/css/nav.css'
import {logoutUser} from '../../redux/modules/users'
import {connect} from 'react-redux'

class Navigation extends Component {

    leaveClick = () => {
        this.props.logoutUser();
        this.setState({isLogin: false});
    }

    render() {
        return (
            <nav>
                <ul id="nav-menu">
                    <li><Link to='/'>Главная</Link></li>

                    {this.props.role === 1 || this.props.role === 0 ?
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
                                {this.props.role === 0 ?
                                    < li >< Link to='/users/'>Пользователи</Link>
                                        <ul>
                                            <li><Link to='/createUser/'>Добавить пользователя</Link></li>
                                        </ul>
                                    </li> : ''
                                }
                            </ul>
                        </li> : ''

                    }
                    {this.props.role === 1 || this.props.role === 0 ?
                        <li><Link to='/'>Товарооборот</Link>
                            <ul>
                                <li><Link to='/arrivedGoods'>Поступление товара</Link>
                                    <ul>
                                        <li><Link to='/createArrivedGoods/'>Добавить поступление</Link></li>
                                    </ul>
                                </li>
                                <li><Link to='/soldGoods'>Продажа товара</Link>
                                    <ul>
                                        <li><Link to='/createSoldGoods/'>Добавить продажу</Link></li>
                                    </ul>
                                </li>
                                <li><Link to='/availabilityGoods'>Наличие товара</Link></li>
                            </ul>

                        </li> : ''}
                    {this.props.isAuthenticated ?
                        <li><Link to='/account'>Учетная запись</Link></li> : ''
                    }
                    {!this.props.isAuthenticated ?
                        <li className="enter-button"><Link to='/login'>Войти</Link></li> :
                        <li className="enter-button"><Link to='/' onClick={this.leaveClick}>Выйти</Link></li>
                    }
                </ul>
            </nav>
        );
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.usersData.isAuthenticated,
    role: state.usersData.role
})

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser())

})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

