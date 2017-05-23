import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../../Loading'

class Attributes extends Component {

    state = {
        attributes: [],
        filterValue: '',
        filteredAttributes: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.attributes !== this.props.attributes) {
            this.setState({attributes: nextProps.attributes, filteredAttributes: nextProps.attributes});
        }
    }

    deleteAttribute = (event) => {
        if (confirm("Вы уверены")) {
            this.props.deleteAttribute(+event.target.value);
            const attributes = this.state.attributes;
            const temp = attributes.filter((item) => item.id === +event.target.value)[0];
            if (temp) {
                attributes.splice(attributes.indexOf(temp), 1);
            }
            this.setState({attributes: attributes});
        }
    }

    filterChange = (event) => {
        const filterValue = event.target.value.toLowerCase();
        this.setState({
            filterValue: filterValue,
            filteredAttributes: this.state.attributes.filter(item => ~item.name.toLowerCase().indexOf(filterValue))
        })
    }
    filterClear = () => {
        this.setState({filterValue: '', filteredAttributes: this.state.attributes});
    }


    render() {
        if (!this.state.attributes)
            return <Loading/>
        else {
            const rows = this.state.filteredAttributes.map((item) =>
                <tr key={item.id}>
                    <td><Link to={"/attributes/" + item.id}>{item.name}</Link></td>
                    <td>{item.type.toString() === '1' ? 'Строка' : 'Число'}</td>

                    <td>
                        <button className="edit-button action-button"
                                onClick={() => this.props.history.push("/createAttribute/" + item.id)}>
                        </button>
                    </td>
                    <td>
                        <button className="delete-button action-button" onClick={this.deleteAttribute}
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
                            <th>Название атрибута</th>
                            <th>Тип атрибута</th>
                            <th></th>
                            <th></th>
                        </tr>
                        {rows}
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button className="add-button action-button"
                                        onClick={() => this.props.history.push("/createAttribute/")}>
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

export default Attributes;