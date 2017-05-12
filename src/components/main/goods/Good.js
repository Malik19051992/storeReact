import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../Loading'


class Good extends Component {

    state = {
        good: null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.good)
            if (nextProps.good !== this.props.good) {
                this.setState({good: nextProps.good});
            }
    }

    render() {
        if (!this.state.good)
            return <Loading/>
        else {
            const properties = this.state.good.properties.map(item => {
                return (<tr key={item.id}>
                    <td>{item.attribute.name}</td>
                    <td>{item.value}</td>
                </tr>)
            });
            return (
                < div >
                    <table className="data-table">
                        <tbody>
                        <tr>
                            <th>Название товара</th>
                            <td>{this.state.good.name}</td>
                        </tr>
                        <tr>
                            <th>Цена товара</th>
                            <td>{this.state.good.price}</td>
                        </tr>
                        </tbody>
                    </table>
                    <h2>Свойства</h2>
                    <table className="data-table">
                        <tbody>
                        <tr>
                            <th>Название атрибута</th>
                            <th>Значение</th>
                        </tr>
                        {properties}
                        </tbody>
                    </table>
                </div>
            )
        }
    }
}

export default Good;

