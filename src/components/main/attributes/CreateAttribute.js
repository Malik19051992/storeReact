import React, {Component} from 'react';
import Loading from '../../Loading'

class CreateAttribute extends Component {
    state = {
        name: "",
        type: 1,
        attribute: null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.attribute !== this.props.attribute) {
            this.setState({
                attribute: nextProps.attribute,
                name: nextProps.attribute.name,
                type: nextProps.attribute.type
            });
        }
    }

    nameChange = (event) => {
        this.setState({name: event.target.value})
    }

    typeChange = (event) => {
        this.setState({type: +event.target.value});
    }

    saveClick = () => {
        if (!this.state.attribute)
            this.props.addAttribute({name: this.state.name, type: this.state.type})
                .then(() => this.props.history.push('/attributes'))
                .catch(error => this.props.history.push('/error/', error))
        else {
            const attributeToSave = this.state.attribute;
            attributeToSave.name = this.state.name;
            attributeToSave.type = this.state.type;
            this.props.updateAttribute(attributeToSave)
                .then(() => this.props.history.push('/attributes'))
                .catch(error => this.props.history.push('/error/', error))
        }
    }

    render() {
        //if (!this.state.attribute)
        //    return <Loading/>
        // else
        return (
            <div className="main-content">
                <table className="input-table">
                    <tbody>
                    <tr>
                        <td><label htmlFor="attributeName">Название атрибута</label></td>
                        <td><input id="attributeName" type="text" onChange={this.nameChange}
                                   value={this.state.name}></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="attributeType">Тип атрибута</label></td>
                        <td><select id="attributeType" onChange={this.typeChange} value={this.state.type}>
                            <option value='1'>Строка</option>
                            <option value='2'>Число</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button className="positive"  onClick={this.saveClick}>Сохранить</button>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        )
    }


}

export default CreateAttribute;

