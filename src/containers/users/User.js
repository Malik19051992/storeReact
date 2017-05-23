import React, {Component} from 'react'
import {connect} from 'react-redux'
import User from '../../components/main/users/User'
import {getUserById} from '../../redux/modules/users'

class UserContainer extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps)
            if (prevProps.match.params.userId !== this.props.match.params.userId) {
                this.fetchData();
            }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.props.getUserById(this.props.match.params.userId);
    }

    render() {
        return <User {...this.props}/>
    }
}

const mapStateToProps = state => ({
    user: state.usersData.user
})

const mapDispatchToProps = {
    getUserById
}

export default connect(mapStateToProps, mapDispatchToProps)(UserContainer)
