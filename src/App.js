import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Navigation from './components/header/Navigation';
import CategoriesTree  from './containers/categoriesTree';
import Home from './components/main/Home';
import Categories from './containers/categories/Categories'
import NewCategory from './containers/categories/CreateCategory';
import Category from './containers/categories/Category';

class App extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <div className="content-site">
                    <div id="tree-menu">
                        <CategoriesTree />
                    </div>
                    <main>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/categories/' component={Categories}/>
                            <Route path='/newCategory/' component={NewCategory}/>
                            <Route path='/categories/:id' component={Category}/>
                        </Switch>
                    </main>
                </div>
            </div>
        );
    }
}


export default App;