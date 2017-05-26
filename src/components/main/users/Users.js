import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../Loading'

class Users extends Component {

    state = {
        users: [],
        filterValue: '',
        filteredUsers: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.users !== this.props.users) {
            this.setState({users: nextProps.users, filteredUsers: nextProps.users});
        }
    }

    deleteUser = (event) => {
        if (confirm("Вы уверены")) {
            this.props.deleteUser(+event.target.value);
            const users = this.state.users;
            const temp = users.filter((item) => item.id === +event.target.value)[0];
            if (temp) {
                users.splice(users.indexOf(temp), 1);
            }
            this.setState({users: users});
        }
    }

    filterChange = (event) => {
        const filterValue = event.target.value.toLowerCase();
        this.setState({
            filterValue: filterValue,
            filteredUsers: this.state.users.filter(item => ~item.name.toLowerCase().indexOf(filterValue) || ~item.login.toLowerCase().indexOf(filterValue))
        })
    }
    filterClear = () => {
        this.setState({filterValue: '', filteredUsers: this.state.users});
    }

    resetPassword = (event) => {
        if (confirm("Вы уверены")) {
            this.props.resetPassword(+event.target.value);
        }
    }


    render() {
        if (!this.state.users)
            return <Loading/>
        else {
            const rows = this.state.filteredUsers.map((item) =>
                <tr key={item.id}>
                    <td><Link to={"/users/" + item.id}>{item.name}</Link></td>
                    <td>{item.login}</td>
                    <td>{item.role.toString() === '0' ? 'Администратор' : item.role.toString() === '1' ? 'Модератор' : 'Пользователь'}</td>
                    <td>
                        <button onClick={this.resetPassword} value={item.id}>Сбросить пароль</button>
                    </td>
                    <td>
                        <button className="edit-button action-button"
                                onClick={() => this.props.history.push("/createUser/" + item.id)}
                                value={item.id}>
                        </button>
                    </td>
                    <td>
                        <button className="delete-button action-button" onClick={this.deleteUser}
                                value={item.id}></button>
                    </td>
                </tr>
            );
            return (
                <div className="main-content">
                    <div className="filter-data">
                        <label htmlFor="filter">Поиск: </label>
                        <input type="text" id="filter" onChange={this.filterChange} value={this.state.filterValue}/>
                        <button className="action-button" onClick={this.filterClear}>.</button>
                    </div>
                    <table className="data-table">
                        <tbody>
                        <tr>
                            <th>Имя пользователя</th>
                            <th>Логин</th>
                            <th>Роль</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        {rows}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="add-button action-button"
                                        onClick={() => this.props.history.push("/createUser/")}>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                </div>
            )
        }
    }
}

export default Users;