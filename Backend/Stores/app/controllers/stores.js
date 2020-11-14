const Store = require('../models/store');

module.exports.get = (query, projection) => {
    return Store.find(query, projection);
}

module.exports.create = ({name, category, description}) => {
    const newStore = new Store({
        name: name,
        category: category,
        description: description
    });
    
    return newStore.save();
}