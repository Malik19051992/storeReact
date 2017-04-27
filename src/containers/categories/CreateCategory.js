import React, {Component} from 'react'
import {connect} from 'react-redux'
import CreateCategory from '../../components/main/categories/CreateCategory'
import {getCategories, addCategory} from '../../redux/modules/categories'

class CreateCategoryContainer extends Component {

    componentDidUpdate(prevProps) {
        this.fetchData();
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.props.getCategories();
    }

    render() {
        return <CreateCategory {...this.props} addCategory={this.props.addCategory}/>
    }
}

const mapStateToProps = state => ({
    categories: state.categoriesData.categories,
    error: state.categoriesData.error
})

const mapDispatchToProps = dispatch => ({
    getCategories,
    addCategory: (data) => dispatch(addCategory(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateCategoryContainer);