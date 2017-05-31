import React, {Component} from 'react';
import Loading from '../../Loading'
import ValidateErrorForm from '../ValidateErrorForm'

class CreateTurnoverGoodsList extends Component {

    state = {
        categories: [],
        turnoverGoodsToSave: [],
        dateAction: '',
        validateErrors: []
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.categories)
            if (nextProps.categories !== this.props.categories) {
                this.setState({categories: nextProps.categories})
            }
        if (nextProps.goods)
            if (nextProps.goods !== this.props.goods) {
                const turnoverGoodsToSave = nextProps.goods.map((item, index) => {
                    return {
                        GoodId: item.id,
                        CategoryId: item.CategoryId,
                        name: item.name,
                        price: item.price,
                        purchasePrice: 0,
                        sellingPrice: 0,
                        count: 0,
                        idForPageList: index
                    }
                })
                this.setState({turnoverGoodsToSave})
            }
    }

    sellingPriceChange = (event) => {
        const turnoverGoods = this.state.turnoverGoodsToSave;
        const idForPageList = event.target.id.slice(12);
        let turnoverGood;
        if (turnoverGoods.length !== 0)
            turnoverGood = turnoverGoods.filter(item => item.idForPageList === +idForPageList)[0];
        turnoverGood.sellingPrice = event.target.value;
        this.setState({turnoverGoodsToSave: turnoverGoods});
    }

    purchasePriceChange = (event) => {
        const turnoverGoods = this.state.turnoverGoodsToSave;
        const idForPageList = event.target.id.slice(13);
        let turnoverGood;
        if (turnoverGoods.length !== 0)
            turnoverGood = turnoverGoods.filter(item => item.idForPageList === +idForPageList)[0];
        turnoverGood.purchasePrice = event.target.value;
        this.setState({turnoverGoodsToSave: turnoverGoods});
    }

    countChange = (event) => {
        const turnoverGoods = this.state.turnoverGoodsToSave;
        const idForPageList = event.target.id.slice(5);
        let arrivedGood;
        if (turnoverGoods.length !== 0)
            arrivedGood = turnoverGoods.filter(item => item.idForPageList === +idForPageList)[0];
        arrivedGood.count = event.target.value;
        this.setState({turnoverGoodsToSave: turnoverGoods});
    }

    dateActionChange = (event) => {
        this.setState({dateAction: event.target.value});
    }

    validateData = () => {
        const validateErrors = [];

        if (this.state.turnoverGoodsToSave
                .filter(item => item.count < 0).length > 0) {
            validateErrors.push({type: 0, message: ' Количество не может быть отрицательным'})
        }
        if (this.state.turnoverGoodsToSave
                .filter(item => item.sellingPrice < 0).length > 0) {
            validateErrors.push({type: 1, message: ' Цена продажи не может быть отрицательной'})
        }
        if (this.state.turnoverGoodsToSave
                .filter(item => item.purchasePrice < 0).length > 0) {
            validateErrors.push({type: 2, message: ' Цена закупки не может быть отрицательной'})
        }
        if (!this.state.dateAction) {
            validateErrors.push({type: 3, message: ' Введите дату'})
        }
        if (this.state.turnoverGoodsToSave
                .filter(item => item.count > 0).length === 0) {
            validateErrors.push({type: 4, message: ' Нет товаров для сохранения'})
        }
        if (validateErrors.length > 0) {
            this.setState({validateErrors})
            return false;
        }
        return true;
    }

    saveClick = () => {
        if (!this.validateData()) {
            return;
        }
        if (this.props.otherParametrs.typeList === 0) {
            this.props.addTurnoverGoods(
                this.state.turnoverGoodsToSave
                    .filter(item => item.count > 0)
                    .map(item => {
                        item.dateAction = this.state.dateAction;
                        item.sellingPrice = undefined;
                        return item;
                    }))
                .then(() => this.props.history.push(`/`))
                .catch(error => this.props.history.push('/error/', error))
        } else {
            this.props.addTurnoverGoods(
                this.state.turnoverGoodsToSave
                    .filter(item => item.count > 0)
                    .map(item => {
                        item.dateAction = this.state.dateAction;
                        item.count = -item.count;
                        item.purchasePrice = undefined;
                        return item;
                    }))
                .then(() => this.props.history.push(`/`))
                .catch(error => this.props.history.push('/error/', error))
        }
    }

    render() {
        if (this.state.turnoverGoodsToSave.length === 0 || this.state.categories.length === 0)
            return <Loading/>
        else {
            let turnoverGoodsToSaveItem = [];
            for (let i = 0; i < this.state.categories.length; i++) {
                const goodsOfCategory = this.state.turnoverGoodsToSave
                    .filter(item => item.CategoryId === this.state.categories[i].id)
                    .map(item =>
                        <tr key={'good' + item.idForPageList}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            {this.props.otherParametrs.typeList === 0 ?
                                <td><input id={"purchasePrice" + item.idForPageList} type="number" min="0" step="0.01"
                                           value={item.purchasePrice}
                                           onChange={this.purchasePriceChange}/></td>
                                :
                                <td><input id={"sellingPrice" + item.idForPageList} type="number" min="0" step="0.01"
                                           value={item.sellingPrice}
                                           onChange={this.sellingPriceChange}/></td>}
                            <td><input id={"count" + item.idForPageList} type="number" value={item.count} min="0"
                                       onChange={this.countChange}/>
                            </td>
                        </tr>)
                if (goodsOfCategory.length > 0) {
                    turnoverGoodsToSaveItem.push(<tr key={'category' + this.state.categories[i].id}>
                        <th>{this.state.categories[i].name}</th>
                    </tr>)
                    turnoverGoodsToSaveItem = turnoverGoodsToSaveItem.concat(goodsOfCategory)
                }

            }
            return <div className="main-content">
                <ValidateErrorForm validateErrors={this.state.validateErrors}/>
                <table className="input-table">
                    <tbody>
                    <tr>
                        <th>Название товара</th>
                        <th>Цена товара</th>
                        {this.props.otherParametrs.typeList === 0 ?
                            <th>Цена при поступлении</th> :
                            <th>Цена при продаже</th>}
                        <th>Количество</th>
                    </tr>
                    {turnoverGoodsToSaveItem}

                    <tr>
                        <td></td>
                        <td>Дата</td>
                        <td><input id={"dateAction"} type="date" value={this.state.dateAction}
                                   onChange={this.dateActionChange}/></td>
                    </tr>
                    <tr>
                        <td>
                            <button className="positive" onClick={this.saveClick}>Сохранить</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        }
    }
}
export default CreateTurnoverGoodsList;
