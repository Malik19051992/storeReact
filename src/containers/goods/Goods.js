import React, {Component} from 'react'
import {connect} from 'react-redux'
import Goods from '../../components/main/goods/Goods'
import {
    deleteGood,
    getGoodsCategoryForPage,
    getGoodsForPage,
    changePage,
    setNumberPage
} from '../../redux/modules/goods'

class GoodsContainer extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps)
            if (prevProps.match.params.categoryId !== this.props.match.params.categoryId) {
                this.fetchData();
            }
    }

    componentWillUnmount() {
        this.props.setNumberPage(1);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        if (this.props.match.params.categoryId)
            this.props.getGoodsCategoryForPage(this.props.match.params.categoryId, this.props.pageSize, this.props.pageNumber);
        else
            this.props.getGoodsForPage(this.props.pageSize, this.props.pageNumber);
    }

    render() {
        return <Goods {...this.props} deleteGood={this.props.deleteGood}
                      categoryId={this.props.match.params.categoryId} changePage={this.props.changePage}
                      getGoodsForPage={this.props.getGoodsForPage}/>
    }
}

const mapStateToProps = state => ({
    goods: state.goodsData.goods,
    pageSize: state.goodsData.pageSize,
    pageNumber: state.goodsData.pageNumber,
    countGoods: state.goodsData.countGoods,
})

const mapDispatchToProps = dispatch => ({
    deleteGood: (id) => dispatch(deleteGood(id)),
    getGoodsCategoryForPage: (id, pageSize, pageNumber) => dispatch(getGoodsCategoryForPage(id, pageSize, pageNumber)),
    getGoodsForPage: (pageSize, pageNumber) => dispatch(getGoodsForPage(pageSize, pageNumber)),
    changePage: (categoryId, pageSize, pageNumber, filterValue) => dispatch(changePage(categoryId, pageSize, pageNumber, filterValue)),
    setNumberPage: (numberPage) => dispatch(setNumberPage(numberPage))
})

export default connect(mapStateToProps, mapDispatchToProps)(GoodsContainer)
