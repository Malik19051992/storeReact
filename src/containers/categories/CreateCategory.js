import React, {Component} from 'react'
import {connect} from 'react-redux'
import CreateCategory from '../../components/main/categories/CreateCategory'
import {getCategories, addCategory, getCategoryById, updateCategory} from '../../redux/modules/categories'

class CreateCategoryContainer extends Component {

    componentDidMount() {
        this.props.getCategories();
        if (this.props.match.params.id)
            this.props.getCategoryById(this.props.match.params.id)
    }

    render() {
        return <CreateCategory {...this.props} addCategory={this.props.addCategory} updateCategory={this.props.updateCategory}/>
    }
}

const mapStateToProps = state => ({
    categories: state.categoriesData.categories,
    category: state.categoriesData.category
})

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
    addCategory: (data) => dispatch(addCategory(data)),
    getCategoryById: (id) => dispatch(getCategoryById(id)),
    updateCategory:(data)=>dispatch(updateCategory(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryContainer);