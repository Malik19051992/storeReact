import React, {Component} from 'react'
import {connect} from 'react-redux'
import CreateAttribute from '../../components/main/attributties/CreateAttribute'
import {getAttributties, addAttribute} from '../../redux/modules/attributties'

class CreateAttributeContainer extends Component {

    componentDidUpdate(prevProps) {
        this.fetchData();
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.props.getAttributties();
    }

    render() {
        return <CreateAttribute {...this.props} addAttribute={this.props.addAttribute}/>
    }
}

const mapStateToProps = state => ({
    attributties: state.attributtiesData.attributties,
    error: state.attributtiesData.error
})

const mapDispatchToProps = dispatch => ({
    getAttributties,
    addAttribute: (data) => dispatch(addAttribute(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateAttributeContainer);