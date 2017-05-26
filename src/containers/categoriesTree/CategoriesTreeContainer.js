import React, {Component} from 'react'
import {connect} from 'react-redux'
import CategoriesTree from '../../components/main/CategoriesTree'
import {getCategoriesTree} from '../../redux/modules/categories'

class CategoriesTreeContainer extends Component {

    componentDidMount() {
        this.props.getCategoriesTree();
    }

    render() {
        return <CategoriesTree {...this.props}/>
    }
}

const mapStateToProps = state => ({
    categoriesTree: state.categoriesData.categoriesTree
})

const mapDispatchToProps = {
    getCategoriesTree
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesTreeContainer)
