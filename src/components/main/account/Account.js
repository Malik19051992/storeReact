import React, {Component} from 'react';
import Loading from '../../Loading'


class Account extends Component {

    state = {
        account: null,
        isShowChangingPassword: false,
        oldPassword: '',
        newPassword: '',
        newPassword2: '',
        errorMessages: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.account)
            if (nextProps.account !== this.props.account) {
                this.setState({account: nextProps.account});
            }
    }

    componentDidMount() {
        this.setState({account: this.props.account});
    }

    oldPasswordChange = (event) => {
        this.setState({oldPassword: event.target.value})
    }

    newPasswordChange = (event) => {
        this.setState({newPassword: event.target.value})
    }

    newPassword2Change = (event) => {
        this.setState({newPassword2: event.target.value})
    }

    changePassword = () => {
        if (this.state.newPassword === '' || this.state.newPassword2 === '' || this.state.oldPassword === '') {
            this.changeMessage(2, ' Не все поля заполнены')
            return;
        }
        if (this.state.newPassword === this.state.newPassword2 && this.state.newPassword === this.state.oldPassword) {
            this.changeMessage(3, ' Новый и старый пароли совпадать не могут')
            return;
        }
        if (this.state.newPassword === this.state.newPassword2) {
            this.props.changePassword({
                id: this.state.account.id,
                newPassword: this.state.newPassword,
                oldPassword: this.state.oldPassword,
            }).then(() => {
                this.props.history.push('/');
            })
                .catch(error => {
                    this.changeMessage(1, ' Старый пароль введен неверно')
                })
        } else {
            this.changeMessage(0, ' Новый пароль и подтверждение пароля не совпадает');
        }
    }

    changeMessage = (type, message) => {
        const messages = this.state.errorMessages;
        const item = messages.filter((item) => item.type === type)[0];
        if (item)
            messages.splice(messages.indexOf(item), 1);

        messages.push({type: 0, message: message});
        this.setState({
            oldPassword: '',
            newPassword: '',
            newPassword2: '',
            errorMessages: messages
        })
    }


    render() {
        const errorMessages = this.state.errorMessages.map((item) =>
            <div key={item.type}>{item.message}</div>
        )
        if (!this.state.account)
            return <Loading/>
        else {
            return (
                <div className="main-content">
                    <div
                        className={(this.state.errorMessages.length > 0 ? 'show-block' : 'hidden-block' ) + " error-message"}>
                        {errorMessages}

                    </div>
                    <table className="data-table">
                        <tbody>
                        <tr>
                            <td>Имя пользователя</td>
                            <td>{this.state.account.userName}</td>
                        </tr>
                        <tr>
                            <td>Логин пользователя</td>
                            <td>{this.state.account.login}</td>
                        </tr>
                        <tr>
                            <td>Роль пользователя</td>
                            <td>{this.state.account.role.toString() === '0' ? 'Администратор' : this.state.account.role.toString() === '1' ? 'Модератор' : 'Пользователь'}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button className={this.state.isShowChangingPassword ? 'hidden-block' : 'show-block'}
                            onClick={() => {
                                this.setState({isShowChangingPassword: true})
                            }}>Сменить пароль
                    </button>
                    <table
                        className={(this.state.isShowChangingPassword ? 'show-block' : 'hidden-block') + ' input-table'}>
                        <tbody>
                        <tr>
                            <td><label htmlFor="oldPassword">Старый пароль</label></td>
                            <td><input id="oldPassword" type="password" onChange={this.oldPasswordChange}
                                       value={this.state.oldPassword}></input>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="newPassword">Новый пароль</label></td>
                            <td><input id="newPassword" type="password" onChange={this.newPasswordChange}
                                       value={this.state.newPassword}></input>
                            </td>

                        </tr>
                        <tr>
                            <td><label htmlFor="newPassword2">Подтвердить новый пароль</label></td>
                            <td><input id="newPassword2" type="password" onChange={this.newPassword2Change}
                                       value={this.state.newPassword2}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button className="positive" onClick={this.changePassword}>Применить изменения
                                </button>
                            </td>
                            <td></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export
default
Account;

