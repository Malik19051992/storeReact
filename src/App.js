import React, {Component} from 'react';
//import TreeBranch  from './components/main/TreeBranch';
import Navigation from './components/header/Navigation';
import Categories from './components/main/Categories'
import Category from './components/main/Category';
import Home from './components/main/Home';
import {Route, Switch} from 'react-router-dom';
import TreeBranch  from './containers/treeBranch';
import axios from 'axios';

class App extends Component {
    /*state = {
        categoriesTree: [],
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        return axios.get('http://localhost:8080/categoriesTree').then(res => {
            this.setState({categoriesTree: res.data});
        }).catch((error) => {
            console.error(error);
        });
    }*/

    render() {
        return (
            <div>
                <Navigation />
                <div className="content-site">
                    <div id="tree-menu">
                        <TreeBranch />
                    </div>
                    <main>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/categories/' component={Categories}/>
                            <Route path='/categories/:id' component={Category}/>
                        </Switch>
                    </main>
                </div>
            </div>
        );
    }
}


export default App;