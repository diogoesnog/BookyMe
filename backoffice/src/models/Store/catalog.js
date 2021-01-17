export default class Catalog {
    constructor(product, price, abstract) {
        this._id = null;
        this.product = product;
        this.price = price;
        this.abstract = abstract;
    }

    setId(id) {
        this._id = id;
    }
}