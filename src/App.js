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
import Users from './containers/users/users'
import CreateUser from './containers/users/CreateUser';
import User from './containers/users/User';
import Error from './containers/ErrorPage';
import Login from './containers/users/Login';
import './resources/css/global.css'
import Footer from './components/Footer'
import Account from './containers/account/Account'
import {requireAuthentication} from './containers/Authenticated'
import CreateTurnoverGoodsList from './containers/turnoverGoods/CreateTurnoverGoodsList'
import TurnoverGoods from './containers/turnoverGoods/TurnoverGoods'
import EditTurnoverGood from './containers/turnoverGoods/EditTurnoverGood'
import AvailabilityGoods from './containers/turnoverGoods/AvailabilityGoods'

export default class App extends Component {
    render() {
        return (
            <div>
                <Navigation/>
                <div className="content-site">
                    <div className="tree-menu">
                        <CategoriesTree />
                    </div>
                    <main>
                        <Error/>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/categories/' component={requireAuthentication(Categories, [0, 1])}/>
                            <Route exact path='/categories/:categoryId'
                                   component={requireAuthentication(Category, [0, 1])}> </Route>
                            <Route exact path='/categories/:categoryId/goods/' component={Goods}/>
                            <Route exact path='/categories/:categoryId/goods/:goodId' component={Goods}/>
                            <Route exact path='/categories/:categoryId/createGood/'
                                   component={requireAuthentication(CreateGood, [0, 1])}/>
                            <Route exact path='/categories/:categoryId/createGood/:goodId'
                                   component={requireAuthentication(CreateGood, [0, 1])}/>
                            <Route exact path='/categories/:categoryId/attributes'
                                   component={requireAuthentication(AttributesCategory, [0, 1])}/>
                            <Route exact path='/createCategory/'
                                   component={requireAuthentication(CreateCategory, [0, 1])}/>
                            <Route exact path='/createCategory/:id'
                                   component={requireAuthentication(CreateCategory, [0, 1])}/>

                            <Route exact path='/attributes/' component={requireAuthentication(Attributes, [0, 1])}/>
                            <Route exact path='/attributes/:attributeId'
                                   component={requireAuthentication(Attribute, [0, 1])}/>
                            <Route exact path='/createAttribute/'
                                   component={requireAuthentication(CreateAttribute, [0, 1])}/>
                            <Route exact path='/createAttribute/:attributeId'
                                   component={requireAuthentication(CreateAttribute, [0, 1])}/>

                            <Route exact path='/users/' component={requireAuthentication(Users, [0])}/>
                            <Route exact path='/users/:userId' component={requireAuthentication(User, [0])}/>
                            <Route exact path='/createUser/' component={requireAuthentication(CreateUser, [0])}/>
                            <Route exact path='/createUser/:userId' component={requireAuthentication(CreateUser, [0])}/>

                            <Route exact path='/goods/' component={Goods}/>
                            <Route exact path='/goods/:goodId' component={Good}/>
                            <Route exact path='/createGood/' component={requireAuthentication(CreateGood, [0, 1])}/>
                            <Route exact path='/createGood/:goodId'
                                   component={requireAuthentication(CreateGood, [0, 1])}/>

                            <Route exact path='/account' component={requireAuthentication(Account, [0, 1, 2])}/>

                            <Route exact path='/createArrivedGoods/'
                                   component={requireAuthentication(CreateTurnoverGoodsList, [0, 1], {typeList: 0})}/>
                            <Route exact path='/arrivedGoods/'
                                   component={requireAuthentication(TurnoverGoods, [0, 1], {typeList: 0})}/>
                            <Route exact path='/arrivedGoods/:turnoverGoodId'
                                   component={requireAuthentication(EditTurnoverGood, [0, 1], {typeList: 0})}/>

                            <Route exact path='/createSoldGoods/'
                                   component={requireAuthentication(CreateTurnoverGoodsList, [0, 1], {typeList: 1})}/>
                            <Route exact path='/soldGoods/'
                                   component={requireAuthentication(TurnoverGoods, [0, 1], {typeList: 1})}/>
                            <Route exact path='/soldGoods/:turnoverGoodId'
                                   component={requireAuthentication(EditTurnoverGood, [0, 1], {typeList: 1})}/>

                            <Route exact path='/availabilityGoods'
                                   component={requireAuthentication(AvailabilityGoods, [0, 1])}/>


                            <Route exact path='/login' component={Login}/>
                        </Switch>
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}




