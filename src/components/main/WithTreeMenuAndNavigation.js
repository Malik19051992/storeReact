import React, {Component} from 'react';
import TreeBranch  from './TreeBranch';
import Navigation from './../header/Navigation';

export default  function WithTreeMenuAndNavigation(Component) {
    return function ComponentWithTreeMenuAndNavigation ({categoriesTree, ...props}) {
        return (
            <div>
                <Navigation />
                <div className="content-site">
                    <div id="tree-menu">
                        <TreeBranch categories={categoriesTree}/>
                    </div>
                    <main>
                        <Component {...props}/>
                    </main>
                </div>
            </div>);
    }
}