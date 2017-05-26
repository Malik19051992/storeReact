import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Navigation from './components/header/Navigation';
import Home from './components/main/Home';
import CategoriesTree  from './containers/categoriesTree';
import {Categories, CreateCategory, Category} from './containers/categories'
import {Attributes, CreateAttribute, Attribute} from './containers/attributes'
import {Goods, Good, CreateGood} from './containers/goods'
import {Login, Users, CreateUser, User} from './containers/users'
import {CreateTurnoverGoodsList, TurnoverGoods, EditTurnoverGood, AvailabilityGoods} from './containers/turnoverGoods'
import AttributesCategory from './containers/attributeCategory/attributesCategory'
import Error from './containers/ErrorPage';
import './resources/css/global.css'
import Account from './containers/account/Account'
import {requireAuthentication} from './containers/Authenticated'
import Breadcrumbs from './containers/Breadcrumbs'
import Footer from './components/Footer'
import TermsOfUse from './components/TermsOfUse'

export default class App extends Component {


    render() {
        return (
            <div>
                <Navigation/>
                <Breadcrumbs  />
                <div className="content-site">

                    <div className="tree-menu">
                        <CategoriesTree />
                    </div>
                    <main>
                        <Error/>
                        <Switch>
                            <Route exact path='/' component={requireAuthentication(Home, [0, 1, 2])}/>
                            <Route exact path='/categories/' component={requireAuthentication(Categories, [0, 1])}/>
                            <Route exact path='/categories/:categoryId'
                                   component={requireAuthentication(Category, [0, 1])}> </Route>
                            <Route exact path='/categories/:categoryId/goods/'
                                   component={requireAuthentication(Goods, [0, 1, 2])}/>
                            <Route exact path='/categories/:categoryId/goods/:goodId'
                                   component={requireAuthentication(Goods, [0, 1, 2])}/>
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

                            <Route exact path='/goods/' component={requireAuthentication(Goods, [0, 1, 2])}/>
                            <Route exact path='/goods/:goodId' component={requireAuthentication(Good, [0, 1, 2])}/>
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
                            <Route exact path='/termsOfUse/'  component={requireAuthentication(TermsOfUse, [0, 1, 2])}/>
                        </Switch>
                    </main>
                </div>
                <Footer/>
            </div>
        );
    }
}




