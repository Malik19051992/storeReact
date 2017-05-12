import React, {Component} from 'react';
import Loading from '../../Loading'

class CreateCategory extends Component {
    state = {
        name: "",
        parentId: null,
        category: null
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category !== this.props.category) {
            this.setState({
                category: nextProps.category,
                name: nextProps.category.name,
                parentId: nextProps.category.parentId
            });
        }
    }

    nameChange = (event) => {
        this.setState({name: event.target.value})
    }

    parentChange = (event) => {
        this.setState({parentId: +event.target.value});
    }

    saveClick = () => {
        if (!this.state.category)
            this.props.addCategory({name: this.state.name, parentId: this.state.parentId})
                .then(() => this.props.history.push('/categories'))
                .catch(error => this.props.history.push('/error/', error))
        else {
            const categoryToSave = this.state.category;
            categoryToSave.name = this.state.name;
            categoryToSave.parentId = this.state.parentId;
            this.props.updateCategory(categoryToSave)
                .then(() => this.props.history.push('/categories'))
                .catch(error => this.props.history.push('/error/', error))
        }
    }

    render() {
        if (!this.props.category)
            return <Loading/>
        else {
            let selectOptions = this.props.categories.map(item => {
                return <option key={item.id} value={item.id}>{item.name}</option>
            });
            selectOptions.unshift(<option key="0" value={null}></option>)
            return (<table>
                <tbody>
                <tr>
                    <td><label htmlFor="categoryName">Название категории</label></td>
                    <td><input id="categoryName" type="text" onChange={this.nameChange} value={this.state.name}></input>
                    </td>
                </tr>
                <tr>
                    <td><label htmlFor="categoryParent">Категория родитель</label></td>
                    <td><select id="categoryParent" onChange={this.parentChange} value={this.state.parentId}>
                        {selectOptions}
                    </select></td>
                </tr>
                <tr>
                    <td>
                        <button onClick={this.saveClick}>Сохранить</button>
                    </td>
                </tr>
                </tbody>
            </table>)
        }
    }

}

export default CreateCategory;

