import React, { Component } from 'react'
import { connect } from 'react-redux'
import Attribute from '../../components/main/attributties/Attribute'
import {getAttributeById} from '../../redux/modules/attributties'

class attributeContainer extends Component {

    componentDidUpdate(prevProps) {
        if(prevProps)
            if(prevProps.match.params.id !== this.props.match.params.id) {
                this.fetchData();
            }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.props.getAttributeById(this.props.match.params.id);
    }

    render() {
        return <Attribute {...this.props}/>
    }
}

const mapStateToProps = state => ({
    attribute: state.attributtiesData.attribute,
    error: state.attributtiesData.error
})

const mapDispatchToProps = {
    getAttributeById
}

export default connect(mapStateToProps, mapDispatchToProps)(attributeContainer)
