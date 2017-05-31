import React, {Component} from 'react'
import {connect} from 'react-redux'
import CreateTurnoverGoodsList from '../../components/main/turnoverGoods/CreateTurnoverGoodsList'
import {addTurnoverGoods} from '../../redux/modules/turnoverGoods'
import {getGoods, getGoodsCategory} from '../../redux/modules/goods'
import {getCategories} from '../../redux/modules/categories'

class CreateTurnoverGoodsListContainer extends Component {

    componentDidMount() {
        if (this.props.match.params.categoryId) {
            this.props.getGoodsCategory(this.props.match.params.categoryId);
            this.props.getCategories();
        } else {
            this.props.getGoods();
            this.props.getCategories();
        }


    }

    render() {
        return <CreateTurnoverGoodsList {...this.props} addTurnoverGoods={this.props.addTurnoverGoods}
                                        getCategories={this.props.getCategories}/>
    }
}

const mapStateToProps = state => ({
    turnoverGoods: state.turnoverGoodsData.turnoverGoods,
    goods: state.goodsData.goods,
    categories: state.categoriesData.categories
})

const mapDispatchToProps = dispatch => ({
    addTurnoverGoods: (data) => dispatch(addTurnoverGoods(data)),
    getGoods: () => dispatch(getGoods()),
    getCategories: () => dispatch(getCategories()),
    getGoodsCategory: (id) => dispatch(getGoodsCategory(id))

})

export default connect(mapStateToProps, mapDispatchToProps)(CreateTurnoverGoodsListContainer);