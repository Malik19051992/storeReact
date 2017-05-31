import React, {Component} from 'react';
import Loading from '../Loading'
import Pagination from './Pagination'


export default function DataTable({header, columns, data, editFunction, deleteFunction, addFunction, dataCountAll, dataCountOnPage, activePage, changePage}) {
    if (!data)
        return <Loading/>
    else {
        const headerData = header.map(item => <th key={item}>{item}</th>);
        const rowsData = data.map((itemData) =>
            <tr key={itemData.id}>
                {columns.map(itemColumn => <td key={itemColumn}>{itemData[itemColumn]}</td>)}
                <td>
                    <button value={itemData.id} className="edit-button action-button"
                            onClick={editFunction}></button>
                </td>
                <td>
                    <button value={itemData.id} className="delete-button action-button"
                            onClick={deleteFunction}></button>
                </td>
            </tr>
        );
        return (<div>
            <table className="data-table">
                <tbody>
                <tr>{headerData}</tr>
                {rowsData}
                <tr>
                    {header.map(item => <td></td>)}
                    <td></td>
                    <td>
                        <button className="add-button action-button"
                                onClick={addFunction}></button>
                    </td>
                </tr>
                </tbody>
            </table>
            <Pagination dataCountAll={dataCountAll} dataCountOnPage={dataCountOnPage} activePage={activePage}
                        changePage={changePage}/>
        </div>)
    }
}