import React, {Component} from 'react';


class CreateCategory extends Component {
    state = {
        name: "",
        parentId: null
    }

    nameChange = (event) => {
        this.setState({name: event.target.value})
    }


    parentChange = (event) => {
        this.setState({parentId: +event.target.value});
    }

    render() {
        if (this.props.error) {
            return <div>{error} </div>
        }
        if (!this.props.categories)
            return <div><p>Loading...</p></div>
        else {
            let selectOptions = this.props.categories.map(item => {
                return <option key={item.id} value={item.id}>{item.name}</option>
            });
            selectOptions.unshift(<option key="0" value={null}></option>)
            return (<table>
                <tbody>
                <tr>
                    <td><label htmlFor="categoryName">Название категории</label></td>
                    <td><input id="categoryName" type="text" onChange={this.nameChange}></input></td>
                </tr>
                <tr>
                    <td><label htmlFor="categoryParent">Категория родитель</label></td>
                    <td><select id="categoryParent" onChange={this.parentChange}>
                        {selectOptions}
                    </select></td>
                </tr>
                <tr>
                    <td>
                        <button onClick={() =>
                            this.props.addCategory({name: this.state.name, parentId: this.state.parentId})
                                .then(this.props.history.push('/categories'))
                                .catch(eroor => alert('Запись не удалась'))}>Сохранить
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>)
        }
    }

}

export default CreateCategory;

