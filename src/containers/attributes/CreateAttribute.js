import React, {Component} from 'react'
import {connect} from 'react-redux'
import CreateAttribute from '../../components/main/attributes/CreateAttribute'
import {addAttribute, getAttributeById, updateAttribute} from '../../redux/modules/attributes'

class CreateAttributeContainer extends Component {

    componentDidMount() {
        if (this.props.match.params.attributeId)
            this.props.getAttributeById(this.props.match.params.attributeId)
    }

    render() {
        return <CreateAttribute {...this.props} addAttribute={this.props.addAttribute} updateAttribute={this.props.updateAttribute}/>
    }
}

const mapStateToProps = state => ({
    attribute: state.attributesData.attribute
})

const mapDispatchToProps = dispatch => ({
    addAttribute: (data) => dispatch(addAttribute(data)),
    getAttributeById: (id) => dispatch(getAttributeById(id)),
    updateAttribute: (data) => dispatch(updateAttribute(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAttributeContainer);