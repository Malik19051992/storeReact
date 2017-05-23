import React, {Component} from 'react'
import {connect} from 'react-redux'
import EditTurnoverGood from '../../components/main/turnoverGoods/EditTurnoverGood'
import {getTurnoverGoodById, updateTurnoverGoods} from '../../redux/modules/turnoverGoods'

class CreateGoodContainer extends Component {

    componentDidMount() {
        if (this.props.match.params.turnoverGoodId)
            this.props.getTurnoverGoodById(this.props.match.params.turnoverGoodId)
    }

    render() {
        return <EditTurnoverGood {...this.props} updateTurnoverGoods={this.props.updateTurnoverGoods}/>
    }
}

const mapStateToProps = state => ({
    turnoverGood: state.turnoverGoodsData.turnoverGood
})

const mapDispatchToProps = dispatch => ({
    getTurnoverGoodById: (id) => dispatch(getTurnoverGoodById(id)),
    updateTurnoverGoods: (data) => dispatch(updateTurnoverGoods(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateGoodContainer);