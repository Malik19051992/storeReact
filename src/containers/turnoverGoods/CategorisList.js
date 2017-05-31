import React, { Component } from 'react'
import { connect } from 'react-redux'
import CategoriesList from '../../components/main/turnoverGoods/CategoriesList'
import {getCategories} from '../../redux/modules/categories'

class CategoriesListContainer extends Component {

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        return <CategoriesList {...this.props} />
    }
}

const mapStateToProps = state => ({
    categories: state.categoriesData.categories
})

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories())
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesListContainer)
