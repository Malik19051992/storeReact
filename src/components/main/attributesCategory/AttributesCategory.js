import React, {Component} from 'react';
import Loading from '../../Loading'

class AttributesCategory extends Component {

    state = {
        elements: null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.attributes.length !== this.props.attributes.length || nextProps.category !== this.props.category) {
            this.fetchData(nextProps);
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(props = this.props) {
        if (props.attributes.length) {
            const elements = [];
            for (let i = 0; i < props.attributes.length; i++) {
                const elementRow = {};
                elementRow.id = props.attributes[i].id;
                elementRow.name = props.attributes[i].name;
                if (props.category)
                    elementRow.checked = !!props.category.attributes.filter(x => x.id === elementRow.id).length;
                else
                    elementRow.checked = false;
                elements.push(elementRow);
            }
            this.setState({elements: elements});
        }
    }

    checkboxChange(event) {
        const array = this.state.elements;
        const row = array.filter(x => x.id.toString() === event.target.value)[0];
        row.checked = event.target.checked;
        this.setState({elements: array});
    }

    render() {
        if (!this.state.elements)
            return <Loading/>
        else {
            const attrsRow = [];
            for (let i = 0; i < this.state.elements.length; i++) {
                attrsRow.push(
                    <tr key={i}>
                        <td>
                            <input id={'attribute' + this.state.elements[i].id} type="checkbox"
                                   value={this.state.elements[i].id} checked={this.state.elements[i].checked}
                                   onChange={this.checkboxChange.bind(this)}/>
                        </td>
                        <td>{this.state.elements[i].name}</td>
                    </tr>);
            }
            return (
                <div className="main-content">
                    <table className="input-table">
                        <tbody>
                        {attrsRow}
                        <tr>
                            <td></td>
                            <td>
                                <button className="positive"  onClick={() => {
                                    let toSaveData = [];
                                    for (let i = 0; i < this.state.elements.length; i++)
                                        if (this.state.elements[i].checked)
                                            toSaveData.push({
                                                CategoryId: +this.props.category.id,
                                                AttributeId: +this.state.elements[i].id
                                            });
                                    if (toSaveData.length === 0) {
                                        toSaveData.push({
                                            CategoryId: +this.props.category.id,
                                            AttributeId: 0
                                        });
                                    }
                                    this.props.saveAttributesCategory(toSaveData, +this.props.category.id)
                                        .then(() => this.props.history.push(`/categories/`))
                                        .catch(error => alert('Запись не удалась'))
                                }}>Сохранить
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

export default AttributesCategory;