import React, {Component} from 'react'
import {connect} from 'react-redux'
import Users from '../../components/main/users/Users'
import {getUsers, deleteUser, resetPassword} from '../../redux/modules/users'

class UsersContainer extends Component {

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        return <Users {...this.props} deleteUser={this.props.deleteUser} resetPassword={this.props.resetPassword}/>
    }
}

const mapStateToProps = state => ({
    users: state.usersData.users
})

const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    deleteUser: (id) => dispatch(deleteUser(id)),
    resetPassword: (id) => dispatch(resetPassword(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
