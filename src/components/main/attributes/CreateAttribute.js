import React, {Component} from 'react';
import Loading from '../../Loading'
import ValidateErrorForm from '../ValidateErrorForm'

class CreateAttribute extends Component {
    state = {
        name: "",
        type: 1,
        attribute: null,
        validateErrors: []
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
        if (!this.validateData()) {
            return;
        }
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

    validateData = () => {
        const validateErrors = [];
        if (!this.state.name.trim()) {
            validateErrors.push({type: 0, message: ' Название атрибута не может быть пустым'})
        }
        if (!this.state.type < 0 || !this.state.type > 1) {
            validateErrors.push({type: 1, message: ' Тип введен неверно'})
        }
        if (validateErrors.length > 0) {
            this.setState({validateErrors})
            return false;
        }
        return true;
    }

    render() {

        return (
            <div className="main-content">
                <ValidateErrorForm validateErrors={this.state.validateErrors}/>
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
                            <button className="positive" onClick={this.saveClick}>Сохранить</button>
                        </td>
                    </tr>

                    </tbody>
                </table>
            </div>
        )
    }


}

export default CreateAttribute;

