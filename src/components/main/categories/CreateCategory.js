import React, {Component} from 'react';

export default function NewCategory({categories, error, addCategory}) {
    if (error) {
        return <div>{error} </div>
    }
    if (!categories)
        return <div><p>Loading...</p></div>
    else {
        let selectOptions = categories.map(item => {
            return <option key={item.id} value={item.id}>{item.name}</option>
        });
        selectOptions.unshift(<option key="0" value={null}></option>)
        return (<div>
            <p>
                <label htmlFor="categoryName">Название категории</label>
                <input id="categoryName" type="text"></input>
            </p>
            <p>
                <label htmlFor="categoryParent">Категория родитель</label>
                <select id="categoryParent">
                    {selectOptions}
                </select>
            </p>
            <button onClick={() => addCategory(createCategory())}>Сохранить</button>
        </div>)
    }
}

function createCategory() {
    let parentId = document.getElementById("categoryParent");
    let name = document.getElementById("categoryName");
    if (parentId && name)
        return {
            name: name.value,
            parentId: parentId.options[parentId.selectedIndex].value
        }
    return null;
}
