import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../Loading'

class Attributes extends Component {

    state = {
        attributes: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.attributes !== this.props.attributes) {
            this.setState({attributes: nextProps.attributes});
        }
    }

    deleteAttribute = (event) => {
        if(confirm("Вы уверены")) {
            this.props.deleteAttribute(+event.target.value);
            const attributes = this.state.attributes;
            const temp = attributes.filter((item) => item.id === +event.target.value)[0];
            if (temp) {
                attributes.splice(attributes.indexOf(temp), 1);
            }
            this.setState({attributes: attributes});
        }
    }


    render() {
        if (!this.state.attributes)
            return <Loading/>
        else {
            const rows = this.state.attributes.map((item)=>
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.type.toString() === '1' ? 'Строка' : 'Число'}</td>
                    <td>
                        <button onClick={() => this.props.history.push("/attributes/" + item.id)}>Детали</button>
                    </td>
                    <td>
                        <button onClick={() => this.props.history.push("/createAttribute/" + item.id)}>Редактировать
                        </button>
                    </td>
                    <td>
                        <button onClick={this.deleteAttribute} value={item.id}>Удалить</button>
                    </td>
                </tr>
            );
            return (
                <div>
                    <table className="data-table">
                        <tbody>
                        <tr>
                            <th>Название атрибута</th>
                            <th>Тип атрибута</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                        {rows}
                        </tbody>
                    </table>
                    <button onClick={()=>this.props.history.push("/createAttribute/")}>Добавить атрибут</button>
                </div>
            )
        }
    }
}

export default Attributes;