import React, {Component} from 'react'
import {connect} from 'react-redux'
import Login from '../../components/main/users/Login'
import {loginUser} from '../../redux/modules/users'

class LoginContainer extends Component {


    render() {
        return (
            <Login {...this.props} loginUser={this.props.loginUser}/>)
    }

}

const mapStateToProps = (state) => ({
    wrongLoginOrPassword: state.usersData.wrongLoginOrPassword
});

const mapDispatchToProps = dispatch => ({
    loginUser: (data) => dispatch(loginUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)

