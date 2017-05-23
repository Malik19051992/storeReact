import React, {Component} from 'react'
import {connect} from 'react-redux'
import Account from '../../components/main/account/Account'
import {changePassword} from '../../redux/modules/users'

class AccountContainer extends Component {

    render() {
        return <Account {...this.props} changePassword={this.props.changePassword}/>
    }
}

const mapStateToProps = state => ({
    account: {
        id: state.usersData.id,
        userName: state.usersData.userName,
        role: state.usersData.role,
        login: state.usersData.login
    }
})

const mapDispatchToProps = dispatch => ({
    changePassword: (data) => dispatch(changePassword(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountContainer);