import React, {Component} from 'react'
import {connect} from 'react-redux'
import CreateGood from '../../components/main/goods/CreateGood'
import {getCategories, getCategoryById} from '../../redux/modules/categories'
import {addGood, updateGood, getGoodById} from '../../redux/modules/goods'
import {savePropertiesGood} from '../../redux/modules/propertiesGood'

class CreateGoodContainer extends Component {

    componentDidMount() {
        this.props.getCategories();
        if (this.props.match.params.goodId)
            this.props.getGoodById(this.props.match.params.goodId)
        if (this.props.match.params.categoryId)
            this.props.getCategoryById(this.props.match.params.categoryId)

    }

    render() {
        return <CreateGood {...this.props} addGood={this.props.addGood} getCategoryById={this.props.getCategoryById}
                           updateGood={this.props.updateGood} savePropertiesGood={this.props.savePropertiesGood}/>
    }
}

const mapStateToProps = state => ({
    categories: state.categoriesData.categories,
    category: state.categoriesData.category,
    good: state.goodsData.good
})

const mapDispatchToProps = dispatch => ({
    getCategories: () => dispatch(getCategories()),
    addGood: (data) => dispatch(addGood(data)),
    getCategoryById: (id) => dispatch(getCategoryById(id)),
    updateGood: (data) => dispatch(updateGood(data)),
    getGoodById: (id) => dispatch(getGoodById(id)),
    savePropertiesGood: (data, goodId) => dispatch(savePropertiesGood(data, goodId))

})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGoodContainer);