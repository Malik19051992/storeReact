import React, {Component} from 'react';
import TreeBranch  from './main/TreeBranch';
import Navigation from './header/Navigation';
import Categories from './main/Categories'
import Category from './main/Category';
import Home from './main/Home';
import {Route} from 'react-router-dom';
import axios from 'axios';

class App extends Component {
    state = {
        categoriesTree: [],
        categories: []
    }

    componentDidMount() {
        this.getCategories();
    }

    getCategories() {
        return axios.get('http://localhost:8080/categories').then(res => {
            this.setState({categories: res.data.categories, categoriesTree: res.data.categoriesTree});
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <div>
                <Navigation />
                <div className="content-site">
                    <div id="tree-menu">
                        <TreeBranch categories={this.state.categoriesTree}/>
                    </div>
                    <main>
                        <Route exact path='/' component={Home}/>
                        <Route exact path='/categories/'
                               render={() => <Categories categories={this.state.categories}/>}/>
                        <Route path='/categories/:id'
                               render={() => <Category categories={this.state.categories}/>}/>

                    </main>
                </div>
            </div>
        );
    }
}



export default App;