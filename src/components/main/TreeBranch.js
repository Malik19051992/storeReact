import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default function TreeBranch({categories}) {
    const lines = categories.map(function (item, index) {
        if (item.childrenOfCategory.length > 0) {
            return (
                <li>
                    <label htmlFor={"category" + item.id}><Link to={"/categories/" + item.id}>{item.name}</Link></label>
                    <input type="checkbox" id={"category" + item.id}/>
                    <TreeBranch categories={item.childrenOfCategory}/>
                </li>
            );
        } else {
            return (<li className="last-category"><Link to={"/categories/" + item.id}>{item.name}</Link></li>);
        }
    });
    return (
        <ol>
            {lines}
        </ol>
    );

}

