render() {
    return (
        <div>
            <Route exact path='/' render={() => <HomeWithTreeMenuAndNavigation categoriesTree={this.state.categoriesTree}/>}/>
            <Route exact path='/categories/'
                   render={() => <CategoriesWithTreeMenuAndNavigation categoriesTree={this.state.categoriesTree} categories={this.state.categories}/>}/>
            <Route path='/categories/:id'
                   render={() => <Category categories={this.state.categories}/>}/>
        </div>
    );
}