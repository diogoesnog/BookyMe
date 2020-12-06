const Catalog = require('../models/catalog');

module.exports.getCatalog = (id) => {
    return Catalog.find({storeID: id});
}

module.exports.removeStoreCatalogs = (id) => {
    return Catalog.deleteMany({storeID: id})
}


module.exports.removeCatalog = (id) => {
    return Catalog.deleteOne({_id: id})
}

module.exports.insertCatalog = (catalog) => {
    const newCatalog = new Catalog(catalog);
    return newCatalog.save();
}