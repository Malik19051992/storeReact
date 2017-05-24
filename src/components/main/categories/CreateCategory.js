import React, {Component} from 'react';
import ValidateErrorForm from '../ValidateErrorForm'

class CreateCategory extends Component {
    state = {
        name: "",
        parentId: null,
        category: null,
        validateErrors: []
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
        if (!this.validateData()) {
            return;
        }
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

    validateData = () => {
        const validateErrors = [];
        if (!this.state.name.trim()) {
            validateErrors.push({type: 0, message: ' Название категории не может быть пустым'})
        }
        if (validateErrors.length > 0) {
            this.setState({validateErrors})
            return false;
        }
        return true;
    }

    render() {
        let selectOptions = this.props.categories.map(item => {
            return <option key={item.id} value={item.id}>{item.name}</option>
        });
        selectOptions.unshift(<option key="0" value={null}></option>)
        return (
            <div className="main-content">
                <ValidateErrorForm validateErrors={this.state.validateErrors}/>
                <table className="input-table">
                    <tbody>
                    <tr>
                        <td><label htmlFor="categoryName">Название категории</label></td>
                        <td><input id="categoryName" type="text" onChange={this.nameChange}
                                   value={this.state.name}></input>
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
                            <button className="positive" onClick={this.saveClick}>Сохранить</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>)
    }
}

export default CreateCategory;

