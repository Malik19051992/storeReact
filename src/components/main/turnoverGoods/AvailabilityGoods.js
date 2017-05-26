import React, {Component} from 'react';
import Loading from '../../Loading'

class AvailabilityGoods extends Component {

    state = {
        categories: [],
        availabilityGoods: [],
        filterValue: '',
        filteredAvailabilityGoods: []
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.categories)
            if (nextProps.categories !== this.props.categories) {
                this.setState({categories: nextProps.categories})
            }

        if (nextProps.availabilityGoods)
            if (nextProps.availabilityGoods !== this.props.availabilityGoods) {

                this.setState({
                    availabilityGoods: nextProps.availabilityGoods,
                    filteredAvailabilityGoods: nextProps.availabilityGoods
                })
            }
    }

    filterChange = (event) => {
        const filterValue = event.target.value.toLowerCase();
        this.setState({
            filterValue: filterValue,
            filteredAvailabilityGoods: this.state.availabilityGoods.filter(item => ~item.name.toLowerCase().indexOf(filterValue) || ~item.price.toString().indexOf(filterValue) || ~item.count.toString().indexOf(filterValue))
        })
    }

    filterClear = () => {
        this.setState({filterValue: '', filteredAvailabilityGoods: this.state.goods});
    }

    render() {
        if (this.state.availabilityGoods.length === 0 || this.state.categories.length === 0)
            return <Loading/>
        else {
            let availabilityGoodsItems = [];
            for (let i = 0; i < this.state.categories.length; i++) {
                const availabilityGoodsOfCategory = this.state.filteredAvailabilityGoods
                    .filter(item => item.CategoryId === this.state.categories[i].id)
                    .map(item =>
                        <tr key={'availabilityGood' + item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.count}</td>
                        </tr>)
                if (availabilityGoodsOfCategory.length > 0) {
                    availabilityGoodsItems.push(<tr key={'category' + this.state.categories[i].id}>
                        <th>{this.state.categories[i].name}</th>
                    </tr>)
                    availabilityGoodsItems = availabilityGoodsItems.concat(availabilityGoodsOfCategory)
                }

            }
            return <div className="main-content">
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
                        <th>Количество</th>
                    </tr>
                    {availabilityGoodsItems}
                    </tbody>
                </table>
            </div>
        }
    }
}
export default AvailabilityGoods;
