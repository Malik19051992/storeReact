import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Navigation from './components/header/Navigation';
import CategoriesTree  from './containers/categoriesTree';
import Home from './components/main/Home';
import Categories from './containers/categories/Categories'
import CreateCategory from './containers/categories/CreateCategory';
import Category from './containers/categories/Category';
import Attributties from './containers/attributties/Attributties'
import CreateAttribute from './containers/attributties/CreateAttribute';
import Attribute from './containers/attributties/Attribute';


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
                            <Route path='/categories/:id' component={Category}/>
                            <Route path='/createCategory/' component={CreateCategory}/>
                            <Route exact path='/attributties/' component={Attributties}/>
                            <Route exact path='/createAttribute/' component={CreateAttribute}/>
                            <Route path='/attributties/:id' component={Attribute}/>


                        </Switch>
                    </main>
                </div>
            </div>
        );
    }
}


export default App;