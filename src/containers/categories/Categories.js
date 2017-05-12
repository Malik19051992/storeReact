import React, { Component } from 'react'
import { connect } from 'react-redux'
import Categories from '../../components/main/categories/Categories'
import {getCategories,deleteCategory} from '../../redux/modules/categories'

class CategoriesContainer extends Component {

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        return <Categories {...this.props} deleteCategory={this.props.deleteCategory}/>
    }
}

const mapStateToProps = state => ({
    categories: state.categoriesData.categories
})

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
    deleteCategory: (id) => dispatch(deleteCategory(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer)
