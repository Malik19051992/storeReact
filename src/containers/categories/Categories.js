import React, { Component } from 'react'
import { connect } from 'react-redux'
import Categories from '../../components/main/categories/Categories'
import {getCategories} from '../../redux/modules/categories'

class categoriesContainer extends Component {

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        return <Categories {...this.props}/>
    }
}

const mapStateToProps = state => ({
    categories: state.categoriesData.categories,
    error: state.categoriesData.error
})

const mapDispatchToProps = {
    getCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(categoriesContainer)
