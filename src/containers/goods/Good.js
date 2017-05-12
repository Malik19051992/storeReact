import React, {Component} from 'react'
import {connect} from 'react-redux'
import Good from '../../components/main/goods/Good'
import {getGoodById} from '../../redux/modules/goods'

class GoodContainer extends Component {

    componentDidUpdate(prevProps) {
        if (prevProps)
            if (prevProps.match.params.goodId !== this.props.match.params.goodId) {

                this.fetchData();
            }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        this.props.getGoodById(this.props.match.params.goodId);
    }

    render() {
        return <Good {...this.props}/>
    }
}

const mapStateToProps = state => ({
    good: state.goodsData.good
})

const mapDispatchToProps = {
    getGoodById
}

export default connect(mapStateToProps, mapDispatchToProps)(GoodContainer)
