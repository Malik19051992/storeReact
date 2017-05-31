import React, {Component} from 'react';
import Loading from '../../Loading'
import {Link} from 'react-router-dom';
import DataTable from '../DataTable'

class Goods extends Component {

    state = {
        goods: [],
        filterValue: ''
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.goods)
            if (nextProps.goods !== this.props.goods) {
                this.setState({goods: nextProps.goods});
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

    editGood = (event) => {
        if (this.props.match.params.categoryId)
            return this.props.history.push(`/categories/${this.props.match.params.categoryId}/createGood/${+event.target.value}`)
        else
            return this.props.history.push("/createGood/" + (+event.target.value))
    }

    changeFilterValue = (event) => {
        const filterValue = event.target.value.toLowerCase();
        this.setState({
            filterValue: filterValue
        })
    }
    clearFilterValue = () => {
        this.setState({filterValue: ''});
    }

    findFilterValue = () => {
        this.props.changePage(this.props.match.params.categoryId, this.props.pageSize, 1, this.state.filterValue)
        //this.props.findByFilterValue(this.props.match.params.categoryId, this.props.pageSize, 1, this.state.filterValue);
    }

    changePage = (pageNumber) => {
        this.props.changePage(this.props.match.params.categoryId, this.props.pageSize, pageNumber, this.state.filterValue)
    }

    addGood = () => {
        this.props.history.push("/createGood/");
    }

    render() {
        if (!this.state.goods)
            return <Loading/>
        else {
            return (
                <div className="main-content">
                    <div className="filter-data">
                        <label htmlFor="filter">Поиск: </label>
                        <input type="text" id="filter" onChange={this.changeFilterValue}
                               value={this.state.filterValue}/>
                        <button className="find-button action-button" onClick={this.findFilterValue}>.</button>
                        <button className="clear-button action-button" onClick={this.clearFilterValue}>.</button>
                    </div>

                    <DataTable header={["Название товара", "Цена товара"]} columns={["nameElement", "price"]}
                               data={this.state.goods.map(item => {
                                   item.nameElement = <Link to={"/goods/" + item.id}> {item.name}</Link>;
                                   return item;
                               })}

                               editFunction={this.editGood}
                               deleteFunction={this.deleteGood} addFunction={this.addGood}
                               dataCountAll={this.props.countGoods} dataCountOnPage={this.props.pageSize}
                               activePage={this.props.pageNumber} changePage={this.changePage}/>
                </div>
            )
        }
    }
}

export default Goods;