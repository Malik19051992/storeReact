import React, {Component} from 'react'
import {connect} from 'react-redux'
import CreateUser from '../../components/main/users/CreateUser'
import {addUser, getUserById, updateUser} from '../../redux/modules/users'

class CreateUserContainer extends Component {

    componentDidMount() {
        if (this.props.match.params.userId)
            this.props.getUserById(this.props.match.params.userId)
    }

    render() {
        return <CreateUser {...this.props} addUser={this.props.addUser} updateUser={this.props.updateUser}/>
    }
}

const mapStateToProps = state => ({
    user: state.usersData.user
})

const mapDispatchToProps = dispatch => ({
    addUser: (data) => dispatch(addUser(data)),
    getUserById: (id) => dispatch(getUserById(id)),
    updateUser: (data) => dispatch(updateUser(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateUserContainer);