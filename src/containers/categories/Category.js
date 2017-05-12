import React, {Component} from 'react'
import {connect} from 'react-redux'
import Category from '../../components/main/categories/Category'
import {getCategoryById} from '../../redux/modules/categories'

class CategoryContainer extends Component {

    componentDidUpdate(prevProps) {
    if (prevProps)
        if (prevProps.match.params.categoryId !== this.props.match.params.categoryId) {

            this.fetchData();
        }
}

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.props.getCategoryById(this.props.match.params.categoryId);
    }

    render() {
        return <Category {...this.props}/>
    }
}

const mapStateToProps = state => ({
    category: state.categoriesData.category
})

const mapDispatchToProps = {
    getCategoryById
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryContainer)
