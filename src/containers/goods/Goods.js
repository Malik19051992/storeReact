import React, {Component} from 'react'
import {connect} from 'react-redux'
import Goods from '../../components/main/goods/Goods'
import {getGoods, getGoodsCategory, deleteGood} from '../../redux/modules/goods'

class GoodsContainer extends Component {

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
        if (this.props.match.params.categoryId)
            this.props.getGoodsCategory(this.props.match.params.categoryId);
        else
            this.props.getGoods();
    }

    render() {
        return <Goods {...this.props} deleteGood={this.props.deleteGood} categoryId={this.props.match.params.categoryId}/>
    }
}

const mapStateToProps = state => ({
    goods: state.goodsData.goods
})

const mapDispatchToProps = dispatch => ({
    getGoods: () => dispatch(getGoods()),
    getGoodsCategory: (id) => dispatch(getGoodsCategory(id)),
    deleteGood: (id) => dispatch(deleteGood(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(GoodsContainer)
