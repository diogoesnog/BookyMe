import Vuex from 'vuex';
import User from '../models/user';


export default new Vuex.Store({
    state: {
        user: new User()
    },

    mutations: {
        newUser(state, payload) {
            state.user = payload;
        },

        addStore(state, payload) {
            state.user.addStore(payload);
        },

        addFavorite(state, payload) {
            state.user.addFavorite(payload);
        },

        removeStore(state, payload) {
            state.user.removeStore(payload);
        },

        removeFavorite(state, payload) {
            state.user.removeFavorite(payload);
        }
    },

    actions: {
        // Synchronous
        async setCurrentUser(state, payload) {
            state.commit('newUser', payload);
        },

        async addFavorite(state, payload) {
            state.commit('addFavorite', payload)
        },

        async addStore(state, payload) {
            state.commit('addStore', payload);
        },

        async removeFavorite(state, payload) {
            state.commit('removeFavorite', payload);
        },

        async removeStore(state, payload) {
            state.commit('removeStore', payload);
        }
    },

    getters: {
        // Grab Information and display anywhere in our app
        getUser: (state)  => state.user,

        getFavorites: (state) => state.user.favorites,

        getStores: (state) => state.user.stores,

        hasStores: (state) => state.user.stores > 0,

        hasFavorites: (state) => state.user.favorites > 0
    }
});