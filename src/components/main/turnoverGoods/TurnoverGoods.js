import React, {Component} from 'react';
import Loading from '../../Loading'
import {Link} from 'react-router-dom';

class TurnoverGoods extends Component {

    state = {
        dateAction: '',
        categoryId: 0,
        searchResults: [],
        filterValue: '',
        filteredTurnoverGoods: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories !== this.props.categories) {
            this.setState({categories: nextProps.categories});
        }
    }

    filterChange = (event) => {
        const filterValue = event.target.value.toLowerCase();
        this.setState({
            filterValue: filterValue,
            filteredTurnoverGoods: this.state.searchResults.filter(item => ~item.name.toLowerCase().indexOf(filterValue)
            || ~item.count.toString().toLowerCase().indexOf(filterValue) || ~item.dateAction.toLowerCase().indexOf(filterValue))
        })
    }

    filterClear = () => {
        this.setState({filterValue: '', filteredTurnoverGoods: this.state.searchResults});
    }

    categoryChange = (event) => {
        this.setState({categoryId: +event.target.value});
    }

    dateActionChange = (event) => {
        this.setState({dateAction: event.target.value});
    }

    searchClick = () => {

        this.props.findTurnoverGoods({
            categoryId: this.state.categoryId !== 0 ? this.state.categoryId : null,
            dateAction: this.state.dateAction,
            typeList: this.props.otherProps.typeList
        })
            .then(result => this.setState({searchResults: result, filteredTurnoverGoods: result}));

    }

    deleteTurnoverGood = (event) => {
        if (confirm("Вы уверены")) {
            this.props.deleteTurnoverGood(+event.target.value);
            const filteredTurnoverGoods = this.state.filteredTurnoverGoods;
            const temp = filteredTurnoverGoods.filter((item) => item.id === +event.target.value)[0];
            if (temp) {
                filteredTurnoverGoods.splice(filteredTurnoverGoods.indexOf(temp), 1);
            }
            this.setState({filteredTurnoverGoods: filteredTurnoverGoods});
        }
    }

    render() {
        if (!this.state.categories)
            return <Loading/>
        else {

            let selectOptions = this.props.categories.map(item => {
                return <option key={item.id} value={item.id}>{item.name}</option>
            });
            selectOptions.unshift(<option key="0" value="0"></option>)

            const searchResult = this.state.filteredTurnoverGoods.map(item =>
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{new Date(item.dateAction).toLocaleString("ru", {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}</td>
                    <td>{item.count}</td>
                    {this.props.otherProps.typeList === 0 ?
                        <td>{item.purchasePrice}</td> :
                        <td>{item.sellingPrice}</td>}
                    {this.props.otherProps.typeList === 0 ?
                        <td>
                            <button className="edit-button action-button"
                                    onClick={() => this.props.history.push("/arrivedGoods/" + item.id)}>
                            </button>
                        </td> :
                        <td>
                            <button className="edit-button action-button"
                                    onClick={() => this.props.history.push("/soldGoods/" + item.id)}>
                            </button>
                        </td>}

                    <td>
                        <button className="delete-button action-button" onClick={this.deleteTurnoverGood}
                                value={item.id}>
                        </button>
                    </td>
                </tr>)

            return (
                <div className="main-content">
                    <table className="input-table">
                        <tbody>
                        <tr>
                            <td>Категория</td>
                            <td><select id="category" onChange={this.categoryChange} value={this.state.categoryId}>
                                {selectOptions}
                            </select></td>
                        </tr>
                        <tr>
                            <td>Дата</td>
                            <td>
                                <input id={"dateAction"} type="date" value={this.state.dateAction}
                                       onChange={this.dateActionChange}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <button onClick={this.searchClick}>Поиск</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>

                    <div className="filter-data">
                        <label htmlFor="filter">Поиск: </label>
                        <input type="text" id="filter" onChange={this.filterChange} value={this.state.filterValue}/>
                        <button className="action-button" onClick={this.filterClear}>.</button>
                    </div>
                    <table className="data-table">
                        <tbody>
                        <tr>
                            <th>Название товара</th>
                            <th>Дата добавления</th>
                            <th>Количество</th>
                            <th>Цена</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {searchResult}
                        </tbody>
                    </table>

                </div>)
        }
    }
}

export default TurnoverGoods;