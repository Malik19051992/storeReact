import React, {Component} from 'react'
import {connect} from 'react-redux'
import Attributes from '../../components/main/attributes/Attributes'
import {getAttributes, deleteAttribute} from '../../redux/modules/attributes'

class AttributesContainer extends Component {

    componentDidMount() {
        this.props.getAttributes();
    }

    render() {
        return <Attributes {...this.props} deleteAttribute={this.props.deleteAttribute}/>
    }
}

const mapStateToProps = state => ({
    attributes: state.attributesData.attributes
})

const mapDispatchToProps = dispatch => ({
    getAttributes: () => dispatch(getAttributes()),
    deleteAttribute: (id) => dispatch(deleteAttribute(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AttributesContainer)
