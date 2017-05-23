import React, {Component} from 'react'
import {connect} from 'react-redux'
import AvailabilityGoods from '../../components/main/turnoverGoods/AvailabilityGoods'
import {getAvailabilityGoods} from '../../redux/modules/turnoverGoods'
import {getCategories} from '../../redux/modules/categories'

class AvailabilityGoodsContainer extends Component {

    componentDidMount() {
        this.props.getAvailabilityGoods();
        this.props.getCategories();
    }

    render() {
        return <AvailabilityGoods {...this.props}/>
    }
}

const mapStateToProps = state => ({
    availabilityGoods: state.turnoverGoodsData.availabilityGoods,
    categories: state.categoriesData.categories
})

const mapDispatchToProps = dispatch => ({
    getAvailabilityGoods: () => dispatch(getAvailabilityGoods()),
    getCategories: () => dispatch(getCategories())

})

export default connect(mapStateToProps, mapDispatchToProps)(AvailabilityGoodsContainer);