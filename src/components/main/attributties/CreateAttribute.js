import React, {Component} from 'react';


class CreateAttribute extends Component {
    state = {
        name: "",
        type: 1
    }

    nameChange = (event) => {
        this.setState({name: event.target.value})
    }

    typeChange = (event) => {
        this.setState({type: +event.target.value});
    }

    render() {
        if (this.props.error) {
            return <div>{error} </div>
        }
        if (!this.props.attributties)
            return <div><p>Loading...</p></div>
        else {
            return (
                <table>
                    <tbody>
                    <tr>
                        <td><label htmlFor="attributeName">Название атрибута</label></td>
                        <td><input id="attributeName" type="text" onChange={this.nameChange}></input></td>
                    </tr>
                    <tr>
                        <td><label htmlFor="attributeType">Тип атрибута</label></td>
                        <td><select id="attributeType" onChange={this.typeChange}>
                            <option value='1'>Строка</option>
                            <option value='2'>Число</option>
                        </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() =>
                                this.props.addAttribute({name: this.state.name, type: this.state.type})
                                    .then(this.props.history.push('/attributties'))
                                    .catch(eroor => alert('Запись не удалась'))}>Сохранить
                            </button>
                        </td>
                    </tr>

                    </tbody>
                </table>
            )
        }
    }

}

export default CreateAttribute;

