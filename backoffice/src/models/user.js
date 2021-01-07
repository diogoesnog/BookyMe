export default class User {
    constructor(name, username, email, password, address, city, zipCode) {
        this.name = name;
        this.username = username;
        this.email = email;
        this.password = password;
        this.address = address;
        this.city = city;
        this.zipCode = zipCode;
        this._id = null;
        this.stores = [];
        this.favorites = [];
    }

    setId(id) {
        this._id = id;
    }

    setStores(stores) {
        this.stores = stores;
    }

    setFavorites(favorites) {
        this.favorites = favorites;
    }

    addFavorite(id) {
        this.favorites.push(id);
    }

    addStore(id) {
        this.stores.push(id);
    }

    removeFavorite(id) {
        this.favorites = this.favorites.filter((item) => item !== id);
    }

    removeStore(id) {
        this.stores = this.stores.filter((item) => item !== id);
    }
}