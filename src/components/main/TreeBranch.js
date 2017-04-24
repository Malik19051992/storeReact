import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default function TreeBranch({categoriesTree}) {
    if (!categoriesTree)
        return <div><p>Loading...</p></div>
    else {
        const lines = categoriesTree.map(function (item, index) {
            if (item.categoriesChildren.length > 0) {
                return (
                    <li>
                        <label htmlFor={"category" + item.id}><Link
                            to={"/categories/" + item.id}>{item.name}</Link></label>
                        <input type="checkbox" id={"category" + item.id}/>
                        <TreeBranch categories={item.categoriesChildren}/>
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
}


