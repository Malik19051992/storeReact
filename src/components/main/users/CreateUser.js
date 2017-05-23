import React, {Component} from 'react';
import Loading from '../../Loading'

class CreateUser extends Component {
    state = {
        name: "",
        login: "",
        role: 0,
        user: null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user !== this.props.user) {
            this.setState({
                user: nextProps.user,
                name: nextProps.user.name,
                login: nextProps.user.login,
                password: nextProps.user.password,
                role: nextProps.user.role
            });
        }
    }

    nameChange = (event) => {
        this.setState({name: event.target.value})
    }

    roleChange = (event) => {
        this.setState({role: +event.target.value});
    }
    loginChange = (event) => {
        this.setState({login: event.target.value})
    }


    saveClick = () => {
        if (!this.state.user)
            this.props.addUser({
                name: this.state.name,
                login: this.state.login,
                password: this.state.login+'123',
                role: this.state.role
            })
                .then(() => this.props.history.push('/users'))
                .catch(error => this.props.history.push('/error/', error))
        else {
            const userToSave = this.state.user;
            userToSave.name = this.state.name;
            userToSave.login = this.state.login;
            userToSave.role = this.state.role
            this.props.updateUser(userToSave)
                .then(() => this.props.history.push('/users'))
                .catch(error => this.props.history.push('/error/', error))
        }
    }

    render() {
        return (
            <div className="main-content">
                <table className="input-table">
                    <tbody>
                    <tr>
                        <td><label htmlFor="userName">Имя пользователя</label></td>
                        <td><input id="userName" type="text" onChange={this.nameChange}
                                   value={this.state.name}></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="userLogin">Логин пользователя</label></td>
                        <td><input id="userLogin" type="text" onChange={this.loginChange}
                                   value={this.state.login}></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="userRole">Роль пользователя</label></td>
                        <td><select id="userRole" onChange={this.roleChange} value={this.state.role}>
                            <option value='0'>Администратор</option>
                            <option value='1'>Модератор</option>
                            <option value='2'>Пользователь</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button className="positive"  onClick={this.saveClick}>Сохранить</button>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        )
    }
}

export default CreateUser;

