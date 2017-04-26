import React, {Component} from 'react'
import {connect} from 'react-redux'
import NewCategory from '../../components/main/categories/CreateCategory'
import {getCategories, addCategory} from '../../redux/modules/categories'

class newCategoryContainer extends Component {

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        return <NewCategory {...this.props} addCategory={getCallback(this.props.addCategory)}/>
    }
}

const mapStateToProps = state => ({
    categories: state.categoriesData.categories,
    error: state.categoriesData.error
})

const mapDispatchToProps = {
    getCategories,
    addCategory
}

export default connect(mapStateToProps, mapDispatchToProps)(newCategoryContainer);

function getCallback(addCategory ) {
    return function (category) {
        addCategory(category);
    }

}

