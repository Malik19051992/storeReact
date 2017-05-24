import React, {Component} from 'react';
import Loading from '../../Loading'
import ValidateErrorForm from '../ValidateErrorForm'

class CreateGood extends Component {

    state = {
        name: "",
        price: 0,
        categoryId: 1,
        attributesCategory: [],
        propertiesToSave: [],
        good: null,
        validateErrors: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.categories.length > 0 && this.props.categories.length === 0 && !this.props.good) {
            this.getCategory(nextProps.categories[0].id);
        }

        if (nextProps.good !== this.props.good) {
            this.setState({
                good: nextProps.good,
                name: nextProps.good.name,
                price: nextProps.good.price,
                categoryId: nextProps.good.CategoryId,
                propertiesToSave: nextProps.good.properties.map(item => ({
                    value: item.value,
                    AttributeId: item.attribute.id,
                    GoodId: nextProps.good.id
                }))
            });
            this.getCategory(nextProps.good.CategoryId);
        }
        //добавляем новые атрибуты
        if (nextProps.category !== this.props.category) {
            this.setState({attributesCategory: nextProps.category.attributes, categoryId: nextProps.category.id});
            const properties = this.state.propertiesToSave;
            for (let i = 0; i < this.state.attributesCategory.length; i++) {
                if (!properties.filter(item => item.AttributeId === this.state.attributesCategory[i].id)[0])
                    properties.push({AttributeId: this.state.attributesCategory[i].id, value: ''})
            }
            this.setState({propertiesToSave: properties});
        }
        //удаляем лишние атрибуты
        if (this.state.attributesCategory.length > 0 && this.state.propertiesToSave.length > 0) {
            let i = 0;
            const arrayToSave = this.state.propertiesToSave;
            while (i < arrayToSave.length) {
                if (!this.state.attributesCategory.filter((item) => item.id === arrayToSave[i].AttributeId)[0])
                    arrayToSave.splice(i, 1);
                i++;
            }
            this.setState({propertiesToSave: arrayToSave})
        }
    }

    nameChange = (event) => {
        this.setState({name: event.target.value})
    }

    priceChange = (event) => {
        this.setState({price: event.target.value})
    }

    categoryChange = (event) => {
        this.getCategory(+event.target.value);
    }

    getCategory(id) {
        this.props.getCategoryById(id)
            .then(category => {
                console.log(category);
                this.setState({
                    categoryId: id,
                    attributesCategory: category.attributes
                });
            }).catch(error => this.props.history.push('/error/', error))
    }

    propertyChange = (event) => {
        const propertiesToSave = this.state.propertiesToSave;
        const attributeId = event.target.id.slice(9);
        let property;
        if (propertiesToSave.length !== 0)
            property = propertiesToSave.filter(item => item.AttributeId === +attributeId)[0];
        if (!property) {
            propertiesToSave.push({AttributeId: +attributeId, value: event.target.value});
        } else {
            property.value = event.target.value;
        }
        this.setState({propertiesToSave: propertiesToSave});
    }


    saveClick = () => {
        if (!this.validateData()) {
            return;
        }
        if (!this.state.good) {
            const goodToSave = {name: this.state.name, price: this.state.price, CategoryId: this.state.categoryId};
            this.props.addGood(goodToSave)
                .then(data => {
                    goodToSave.properties = this.state.propertiesToSave.map(item => ({
                        AttributeId: item.AttributeId,
                        GoodId: data.goodId,
                        value: item.value
                    }))
                    this.props.savePropertiesGood(goodToSave.properties, data.goodId)
                        .then(() => this.props.history.push(`/categories/${this.state.categoryId}/goods`))
                        .catch(error => this.props.history.push('/error/', error))
                })
                .catch(error => this.props.history.push('/error/', error))
        }
        else {
            const goodToSave = this.state.good;
            goodToSave.name = this.state.name;
            goodToSave.price = this.state.price;
            goodToSave.CategoryId = this.state.categoryId;
            this.props.updateGood(goodToSave)
                .then(data => {
                    goodToSave.properties = this.state.propertiesToSave.map(item => ({
                        AttributeId: item.AttributeId,
                        GoodId: goodToSave.id,
                        value: item.value
                    }))
                    return this.props.savePropertiesGood(goodToSave.properties, goodToSave.id)
                        .then(() => this.props.history.push(`/categories/${this.state.categoryId}/goods`))
                        .catch(error => this.props.history.push('/error/', error))
                })
                .catch(error => this.props.history.push('/error/', error))
        }
    }

    validateData = () => {
        const validateErrors = [];
        if (!this.state.name.trim()) {
            validateErrors.push({type: 0, message: ' Название товара не может быть пустым'})
        }
        if (!this.state.price) {
            validateErrors.push({type: 1, message: ' Цена товара не может быть нулевой'})
        }
        if (!this.state.price<0) {
            validateErrors.push({type: 2, message: ' Цена товара не может быть меньше либо равно 0'})
        }
        if (validateErrors.length > 0) {
            this.setState({validateErrors})
            return false;
        }
        return true;
    }


    render() {
        if (!this.props.categories)
            return <Loading/>
        else {
            const selectOptionsCategory = this.props.categories.map(item => {
                return <option key={item.id} value={item.id}>{item.name}</option>
            });
            const attributesRows = this.state.attributesCategory.map(item =>
                <tr key={item.id}>
                    <td><label htmlFor={'attribute' + item.id}>{item.name}</label></td>
                    <td>
                        <input id={'attribute' + item.id} type={item.type.toString() === '1' ? 'text' : 'number'}
                               onChange={this.propertyChange}
                               value={(() => {
                                   const savedItem = this.state.propertiesToSave.filter(p => p.AttributeId === item.id)[0];
                                   if (savedItem) {
                                       return savedItem.value;
                                   }
                               })()
                               }></input>
                    </td>
                </tr>
            )

            return (
                <div className="main-content">
                    <ValidateErrorForm validateErrors={this.state.validateErrors}/>
                    <table className="input-table">
                        <tbody>
                        <tr>
                            <td><label htmlFor="goodName">Название товара</label></td>
                            <td><input id="goodName" type="text" onChange={this.nameChange}
                                       value={this.state.name}></input>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="goodPrice">Цена товара</label></td>
                            <td><input id="goodPrice" pattern="\d+(\.\d{2})?" type="number" onChange={this.priceChange}
                                       value={this.state.price} min="0" step="0.01"></input>
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="category">Категория</label></td>
                            <td><select id="category" onChange={this.categoryChange} value={this.state.categoryId}>
                                {selectOptionsCategory}
                            </select></td>
                        </tr>
                        {attributesRows}

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
}


export default CreateGood;
