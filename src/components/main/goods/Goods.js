import React, {Component} from 'react';
import Loading from '../../Loading'
import {Link} from 'react-router-dom';

class Goods extends Component {

    state = {
        goods: [],
        filterValue: '',
        filteredGood: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.goods !== this.props.goods) {
            this.setState({goods: nextProps.goods, filteredGood: nextProps.goods});
        }
    }

    deleteGood = (event) => {
        if (confirm("Вы уверены")) {
            this.props.deleteGood(+event.target.value);
            const goods = this.state.goods;
            const temp = goods.filter((item) => item.id === +event.target.value)[0];
            if (temp) {
                goods.splice(goods.indexOf(temp), 1);
            }
            this.setState({goods: goods});
        }
    }

    filterChange = (event) => {
        const filterValue = event.target.value.toLowerCase();
        this.setState({
            filterValue: filterValue,
            filteredGood: this.state.goods.filter(item => ~item.name.toLowerCase().indexOf(filterValue) || ~item.price.toString().indexOf(filterValue))
        })
    }
    filterClear = () => {
        this.setState({filterValue: '', filteredGood: this.state.goods});
    }

    render() {
        if (!this.state.goods)
            return <Loading/>
        else {
            const rows = this.state.filteredGood.map((item) =>
                <tr key={item.id}>
                    <td><Link to={"/goods/" + item.id}> {item.name}</Link></td>
                    <td>{item.price}</td>
                    <td>
                        <button className="edit-button action-button" onClick={() => {
                            if (this.props.categoryId)
                                return this.props.history.push(`/categories/${this.props.categoryId}/createGood/${item.id}`)
                            else
                                return this.props.history.push("/createGood/" + item.id)
                        }}>
                        </button>
                    </td>
                    <td>
                        <button className="delete-button action-button" onClick={this.deleteGood}
                                value={item.id}></button>
                    </td>
                </tr>
            );
            return (
                <div className="main-content">
                    <div className="filter-data">
                        <label htmlFor="filter">Поиск: </label>
                        <input type="text" id="filter" onChange={this.filterChange} value={this.state.filterValue}/>
                        <button className="action-button" onClick={this.filterClear}>.</button>
                    </div>

                    <table className="data-table">
                        <tbody>
                        <tr>
                            <th>Название товара</th>
                            <th>Цена товара</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {rows}
                        <tr>
                            <td>

                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="add-button action-button" onClick={() => {
                                    if (this.props.categoryId)
                                        return this.props.history.push(`/categories/${this.props.categoryId}/createGood/`)
                                    else
                                        return this.props.history.push("/createGood/")
                                }}>
                                </button>
                            </td>

                        </tr>
                        </tbody>
                    </table>

                </div>
            )
        }
    }
}

export default Goods;