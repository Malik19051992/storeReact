import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Navigation from './components/header/Navigation';
import CategoriesTree  from './containers/categoriesTree';
import Home from './components/main/Home';
import Categories from './containers/categories/Categories'
import CreateCategory from './containers/categories/CreateCategory';
import Category from './containers/categories/Category';
import Attributes from './containers/attributes/attributes'
import CreateAttribute from './containers/attributes/CreateAttribute';
import Attribute from './containers/attributes/Attribute';
import AttributesCategory from './containers/attributeCategory/attributesCategory'
import Goods from './containers/goods/Goods'
import Good from './containers/goods/Good'
import CreateGood from './containers/goods/CreateGood'
import Error from './containers/ErrorPage';



export default class App extends Component {

    render() {
        return (
            <div>
                <Navigation />
                <div className="content-site">
                    <div id="tree-menu">
                        <CategoriesTree />
                    </div>
                    <main>
                        <Error/>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/categories/' component={Categories}/>
                            <Route exact path='/categories/:categoryId' component={Category}> </Route>
                            <Route exact path='/categories/:categoryId/goods/' component={Goods}/>
                            <Route exact path='/categories/:categoryId/goods/:goodId' component={Goods}/>
                            <Route exact path='/categories/:categoryId/createGood/' component={CreateGood}/>
                            <Route exact path='/categories/:categoryId/createGood/:goodId' component={CreateGood}/>
                            <Route path='/categories/:categoryId/attributes' component={AttributesCategory}/>
                            <Route exact path='/createCategory/' component={CreateCategory}/>
                            <Route path='/createCategory/:id' component={CreateCategory}/>

                            <Route exact path='/attributes/' component={Attributes}/>
                            <Route path='/attributes/:id' component={Attribute}/>
                            <Route exact path='/createAttribute/' component={CreateAttribute}/>
                            <Route exact path='/createAttribute/:id' component={CreateAttribute}/>

                            <Route exact path='/goods/' component={Goods}/>
                            <Route exact path='/goods/:goodId' component={Good}/>
                            <Route exact path='/createGood/' component={CreateGood}/>
                            <Route exact path='/createGood/:goodId' component={CreateGood}/>
                        </Switch>
                    </main>
                </div>
            </div>
        );
    }
}




