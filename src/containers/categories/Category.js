import React, { Component } from 'react'
import { connect } from 'react-redux'
import Category from '../../components/main/categories/Category'
import {getCategoryById} from '../../redux/modules/categories'

class categoryContainer extends Component {

    componentDidMount() {
        this.props.getCategoryById(this.props.match.params.id);
    }

    render() {
        return <Category {...this.props}/>
    }
}

const mapStateToProps = state => ({
    category: state.categoriesData.category,
    error: state.categoriesData.error
})

const mapDispatchToProps = {
    getCategoryById
}

export default connect(mapStateToProps, mapDispatchToProps)(categoryContainer)
