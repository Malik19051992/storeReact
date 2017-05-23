import React, {Component} from 'react';
import '../../../resources/css/login.css'

class Login extends Component {

    state = {
        login: '',
        password: '',
        isShow: true
    }

    enterClick = () => {
        this.props.loginUser({login: this.state.login, password: this.state.password})
            .then(() => {
                if (!this.props.wrongLoginOrPassword) return this.props.history.push('/')
            });
    }

    loginChange = (event) => {
        this.setState({login: event.target.value})
    }

    passwordChange = (event) => {
        this.setState({password: event.target.value})
    }

    closeButton = (event) => {
        this.setState({isShow: false});
    }

    componentWillReceiveProps() {
        this.setState({isShow: true});
    }


    render() {
        return (
            <div className={this.state.isShow ? "login-form" : "login-form-not-show"}>
                <div className="login-content">
                    <button className="login-close" onClick={this.closeButton}></button>
                    <table>
                        <tbody>
                        <tr>
                            <td><label htmlFor="login">Логин</label></td>
                            <td><input id="login" type="text" onChange={this.loginChange}></input></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="password">Пароль</label></td>
                            <td><input id="password" type="password" onChange={this.passwordChange}></input></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.enterClick}>Войти</button>
                            </td>
                            <td>Забыли пароль?</td>
                            <td>

                            </td>
                        </tr>
                        </tbody>
                    </table>
                    {this.props.wrongLoginOrPassword ?
                        <div className="wrong-data">Неверный логин или пароль</div> : ''}
                </div>
            </div>
        )
    }
}

export default Login;
