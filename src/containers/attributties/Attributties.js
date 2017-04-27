import React, { Component } from 'react'
import { connect } from 'react-redux'
import Attributties from '../../components/main/attributties/Attributies'
import {getAttributties} from '../../redux/modules/attributties'

class attributtiesContainer extends Component {

    componentDidMount() {
        this.props.getAttributties();
    }

    render() {
        return <Attributties {...this.props}/>
    }
}

const mapStateToProps = state => ({
    attributties: state.attributtiesData.attributties,
    error: state.categoriesData.error
})

const mapDispatchToProps = {
    getAttributties
}

export default connect(mapStateToProps, mapDispatchToProps)(attributtiesContainer)
