import React, {Component} from 'react';
import Loading from '../../Loading'

class EditTurnoverGood extends Component {

    state = {
        turnoverGood: null,
        name: '',
        dateAction: null,
        count: 0,
        purchasePrice: 0,
        sellingPrice: 0
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.turnoverGood)
            if (nextProps.turnoverGood !== this.props.turnoverGood) {
                const turnoverGood = {
                    turnoverGood: nextProps.turnoverGood,
                    name: nextProps.turnoverGood.name,
                    dateAction: nextProps.turnoverGood.dateAction.slice(0, 10)
                }
                if (this.props.otherProps.typeList === 0) {
                    turnoverGood.count = nextProps.turnoverGood.count;
                    turnoverGood.purchasePrice = nextProps.turnoverGood.purchasePrice;
                }
                else {
                    turnoverGood.count = -nextProps.turnoverGood.count;
                    turnoverGood.purchasePrice = nextProps.turnoverGood.sellingPrice;
                }
                console.log(turnoverGood);
                this.setState(turnoverGood);
            }
    }

    saveClick = () => {
        const turnoverGood = this.state.turnoverGood;
        turnoverGood.dateAction = this.state.dateAction;
        if (this.props.otherProps.typeList === 0) {
            turnoverGood.count = this.state.count;
            turnoverGood.purchasePrice = this.state.purchasePrice;
            turnoverGood.sellingPrice = undefined
        } else {
            turnoverGood.count = -this.state.count;
            turnoverGood.purchasePrice = undefined
            turnoverGood.sellingPrice = this.state.sellingPrice;
        }
        this.props.updateTurnoverGoods(turnoverGood)
            .then(() => this.props.otherProps.typeList === 0 ? this.props.history.push(`/arrivedGoods`) : this.props.history.push(`/soldGoods`))
            .catch(error => this.props.history.push('/error/', error))


    }

    dateActionChange = (event) => {
        this.setState({dateAction: event.target.value});
    }

    countChange = (event) => {
        this.setState({count: event.target.value});
    }

    purchasePriceChange = (event) => {
        this.setState({purchasePrice: event.target.value});
    }

    sellingPriceChange = (event) => {
        this.setState({sellingPrice: event.target.value});
    }


    render() {
        if (!this.state.turnoverGood)
            return <Loading/>
        else {
            return (<div className="main-content">
                <table className="input-table">
                    <tbody>
                    <tr>
                        <td><label>Название товара</label></td>
                        <td><label>{this.state.turnoverGood.name}</label></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="dateAction">Дата</label></td>
                        <td><input id="dateAction" type="date" onChange={this.dateActionChange}
                                   value={this.state.dateAction}></input>
                        </td>
                    </tr>
                    <tr>
                        <td><label htmlFor="count">Количество</label></td>
                        <td><input id="count" type="number" onChange={this.countChange} min="0"
                                   value={this.state.count}></input>
                        </td>
                    </tr>
                    {this.props.otherProps.typeList === 0 ?
                        <tr>
                            <td><label htmlFor="purchasePrice">Цена при поступлении</label></td>
                            <td><input id="purchasePrice" type="number" onChange={this.purchasePriceChange}
                                       value={this.state.purchasePrice} min="0" step="0.01"></input>
                            </td>
                        </tr> :
                        <tr>
                            <td><label htmlFor="sellingPrice">Цена при продаже</label></td>
                            <td><input id="sellingPrice" type="number" onChange={this.sellingPriceChange}
                                       value={this.state.sellingPrice} min="0" step="0.01"></input>
                            </td>
                        </tr>
                    }
                    <tr>
                        <td>
                            <button className="positive" onClick={this.saveClick}>Сохранить</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>)
        }
    }
}
export default EditTurnoverGood;
