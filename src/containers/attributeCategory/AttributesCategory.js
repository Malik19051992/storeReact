import React, {Component} from 'react'
import {connect} from 'react-redux'
import {saveAttributesCategory, getCategoryByIdAndAttributes} from '../../redux/modules/attributesCategory'
import AttributesCategory from '../../components/main/attributesCategory/AttributesCategory'


class AttributesCategoryContainer extends Component {

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        if (this.props.match.params.categoryId)
            this.props.getCategoryByIdAndAttributes(this.props.match.params.categoryId);
    }

    render() {
        return <AttributesCategory {...this.props} saveAttributesCategory={this.props.saveAttributesCategory}/>
    }
}

const mapStateToProps = state => ({
    category: state.attributesCategoryData.category,
    attributes: state.attributesCategoryData.attributes
})

const mapDispatchToProps = dispatch => ({
    getCategoryByIdAndAttributes: (id) => dispatch(getCategoryByIdAndAttributes(id)),
    saveAttributesCategory: (data, categoryId) => dispatch(saveAttributesCategory(data, categoryId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AttributesCategoryContainer);

