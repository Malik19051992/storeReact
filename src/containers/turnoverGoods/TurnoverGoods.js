import React, {Component} from 'react'
import {connect} from 'react-redux'
import TurnoverGoods from '../../components/main/turnoverGoods/TurnoverGoods'
import {findTurnoverGoods, deleteTurnoverGood} from '../../redux/modules/turnoverGoods'
import {getCategories} from '../../redux/modules/categories'

class TurnoverGoodsContainer extends Component {

    componentDidMount() {
        this.props.getCategories();
    }

    render() {
        return <TurnoverGoods {...this.props} findTurnoverGoods={this.props.findTurnoverGoods}/>
    }
}

const mapStateToProps = state => ({
    turnoverGoods: state.turnoverGoodsData.turnoverGoods,
    categories: state.categoriesData.categories
})

const mapDispatchToProps = dispatch => ({
    findTurnoverGoods: (data) => dispatch(findTurnoverGoods(data)),
    getCategories: () => dispatch(getCategories()),
    deleteTurnoverGood: (id) => dispatch(deleteTurnoverGood(id))

})

export default connect(mapStateToProps, mapDispatchToProps)(TurnoverGoodsContainer);