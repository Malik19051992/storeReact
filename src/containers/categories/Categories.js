import React, {Component} from 'react'
import {connect} from 'react-redux'
import Categories from '../../components/main/categories/Categories'
import {
    deleteCategory,
    getCategoriesForPage,
    changePage,
    setNumberPage
} from '../../redux/modules/categories'

class CategoriesContainer extends Component {

    componentDidMount() {
        this.props.getCategoriesForPage(this.props.pageSize, this.props.pageNumber);
    }

    componentWillUnmount() {
        this.props.setNumberPage(1);
    }

    render() {
        return <Categories {...this.props} deleteCategory={this.props.deleteCategory} changePage={this.props.changePage}
                           getCategoriesForPage={this.props.getCategoriesForPage}/>
    }
}

const mapStateToProps = state => ({
    categories: state.categoriesData.categories,
    pageSize: state.categoriesData.pageSize,
    pageNumber: state.categoriesData.pageNumber,
    countCategories: state.categoriesData.countCategories,
})

const mapDispatchToProps = dispatch => ({
    deleteCategory: (id) => dispatch(deleteCategory(id)),
    getCategoriesForPage: (pageSize, pageNumber) => dispatch(getCategoriesForPage(pageSize, pageNumber)),
    changePage: (pageSize, pageNumber, filterValue) => dispatch(changePage(pageSize, pageNumber, filterValue)),
    setNumberPage: (numberPage) => dispatch(setNumberPage(numberPage))
})

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesContainer)
