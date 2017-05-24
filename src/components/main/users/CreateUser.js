import React, {Component} from 'react';
import ValidateErrorForm from '../ValidateErrorForm'

class CreateUser extends Component {
    state = {
        name: "",
        login: "",
        role: 0,
        user: null,
        users: [],
        validateErrors: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user)
            if (nextProps.user !== this.props.user) {
                this.setState({
                    user: nextProps.user,
                    name: nextProps.user.name,
                    login: nextProps.user.login,
                    password: nextProps.user.password,
                    role: nextProps.user.role
                });
            }
        if (nextProps.users)
            if (nextProps.users !== this.props.users) {
                this.setState({users: nextProps.users})
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

    validateData = () => {
        const validateErrors = [];
        if (!this.state.login.trim()) {
            validateErrors.push({type: 1, message: ' Поле логина не может быть путым'})
        }
        if (!this.state.name.trim()) {
            validateErrors.push({type: 2, message: ' Поле имени не может быть путым'})
        }
        if (!this.state.role < 0 || !this.state.role > 2) {
            validateErrors.push({type: 4, message: ' Роль введена неверно'})
        }
        if (validateErrors.length > 0) {
            this.setState({validateErrors})
            return false;
        }
        return true;
    }

    saveClick = () => {
        if (!this.validateData()) {
            return;
        }
        const countUsers = this.state.users.filter(item => item.login === this.state.login).length;
        if (!this.state.user) {
            if (countUsers > 0) {
                this.setState({validateErrors: [{type: 0, message: ' Пользователь с таким логином уже существует'}]})
                return;
            }
            this.props.addUser({
                name: this.state.name,
                login: this.state.login,
                password: this.state.login + '123',
                role: this.state.role
            })
                .then(() => this.props.history.push('/users'))
                .catch(error => this.props.history.push('/error/', error))
        } else {
            if (countUsers > 1) {
                this.setState({validateErrors: [{type: 0, message: ' Пользователь с таким логином уже существует'}]})
                return;
            }
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
                <ValidateErrorForm validateErrors={this.state.validateErrors}/>
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
                            <button className="positive" onClick={this.saveClick}>Сохранить</button>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        )
    }
}

export default CreateUser;

