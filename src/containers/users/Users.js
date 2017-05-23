import React, {Component} from 'react'
import {connect} from 'react-redux'
import Users from '../../components/main/users/Users'
import {getUsers, deleteUser} from '../../redux/modules/users'

class UsersContainer extends Component {

    componentDidMount() {
        this.props.getUsers();
    }

    render() {
        return <Users {...this.props} deleteUser={this.props.deleteUser}/>
    }
}

const mapStateToProps = state => ({
    users: state.usersData.users
})

const mapDispatchToProps = dispatch => ({
    getUsers: () => dispatch(getUsers()),
    deleteUser: (id) => dispatch(deleteUser(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer)
