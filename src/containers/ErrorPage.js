import React, {Component} from 'react'
import {connect} from 'react-redux'
import ErrorPage from '../components/ErrorPage'
import {removeError, getError} from '../redux/modules/errors'


class ErrorContainer extends Component {

    componentDidMount() {
        this.props.getError(0);
    }

    render() {
        return <ErrorPage {...this.props} removeError={this.props.removeError}/>
    }
}

const mapStateToProps = state => ({
    errors: state.errorsData.errorsArray
})

const mapDispatchToProps = dispatch => ({
    removeError: (index) => dispatch(removeError(index)),
    getError: (index) => dispatch(getError(index))
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorContainer)


