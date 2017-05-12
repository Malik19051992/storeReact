import React, { Component } from 'react'
import { connect } from 'react-redux'
import TreeBranch from '../../components/main/TreeBranch'
import {getCategoriesTree} from '../../redux/modules/categories'

class categoriesTreeContainer extends Component {

    componentDidMount() {
        this.props.getCategoriesTree();
    }

    render() {
        return <TreeBranch {...this.props}/>
    }
}

const mapStateToProps = state => ({
    categoriesTree: state.categoriesData.categoriesTree
})

const mapDispatchToProps = {
    getCategoriesTree
}

export default connect(mapStateToProps, mapDispatchToProps)(categoriesTreeContainer)
