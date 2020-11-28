const Catalog = require('../models/catalog');

module.exports.getCatalog = (id) => {
    return Catalog.findOne({storeID: id});
}

module.exports.insertCatalog = (catalog) => {
    const newCatalog = new Catalog(catalog);
    return newCatalog.save();
}