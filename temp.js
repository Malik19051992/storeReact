if (nextProps.goods !== this.props.goods) {
    this.setState({goods: nextProps.goods})
}
if (nextProps.categories !== this.props.categories) {
    this.setState({categories: nextProps.categories})
}
if (this.state.goods && this.state.categories) {
    const turnoverGoodsToSave = [];
    for (let i = 0; i < this.state.categories.length; i++) {
        const goodsOfCategory = this.state.goods.filter(item => item.CategoryId === this.state.categories[i].id);
        if (goodsOfCategory.length > 0) {
            turnoverGoodsToSave.push({
                name: this.state.categories[i.name],
                goods: goodsOfCategory.map((item, index) => {
                    return {
                        GoodId: item.id,
                        name: item.name,
                        price: item.price,
                        purchasePrice: 0,
                        sellingPrice: 0,
                        count: 0,
                        idForPageList: index
                    }
                })
            })
        }
    }
    this.setState({turnoverGoodsToSave})

}