import React, {Component} from 'react';
import Loading from '../../Loading'

class Goods extends Component {

    state = {
        goods: []
    }

    componentWillReceiveProps(nextProps) {
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


    render() {
        if (!this.state.goods)
            return <Loading/>
        else {
            const rows = this.state.goods.map((item) =>
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>
                        <button onClick={() => this.props.history.push("/goods/" + item.id)}>Детали</button>
                    </td>
                    <td>
                        <button onClick={() => {
                            if (this.props.categoryId)
                                return this.props.history.push(`/categories/${this.props.categoryId}/createGood/${item.id}`)
                            else
                                return this.props.history.push("/createGood/" + item.id)
                        }}>Редактировать
                        </button>

                    </td>
                    <td>
                        <button onClick={this.deleteGood} value={item.id}>Удалить</button>
                    </td>
                </tr>
            );
            return (
                <div>
                    <table className="data-table">
                        <tbody>
                        <tr>
                            <th>Название товара</th>
                            <th>Цена товара</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        {rows}
                        </tbody>
                    </table>
                    <button onClick={() => {
                        if (this.props.categoryId)
                            return this.props.history.push(`/categories/${this.props.categoryId}/createGood/`)
                        else
                            return this.props.history.push("/createGood/")
                    }}>Добавить товар
                    </button>
                </div>
            )
        }
    }
}

export default Goods;