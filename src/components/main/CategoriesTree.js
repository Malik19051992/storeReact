import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loading from '../Loading'
import '../../resources/css/tree-menu.css'

export default function TreeBranch({categoriesTree}) {
    if (!categoriesTree)
        return <Loading/>
    else {
        const lines = categoriesTree.map(function (item, index) {
            if (item.categoriesChildren.length > 0) {
                return (
                    <li key={item.id}>
                        <label htmlFor={"category" + item.id}><Link
                            to={`/categories/${item.id}/goods/`}>{item.name}</Link></label>
                        <input type="checkbox" id={"category" + item.id}/>
                        <TreeBranch categoriesTree={item.categoriesChildren}/>
                    </li>
                );
            } else {
                return (<li className="last-category" key={item.id}><Link
                    to={`/categories/${item.id}/goods/`}>{item.name}</Link></li>);
            }
        });
        return (
            <ol>
                {lines}
            </ol>
        );
    }
}


