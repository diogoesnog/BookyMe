const User = require('../models/user');


// TODO:  login, atualizar infos, mudar de pass, addFavorites
module.exports.createUser = ({name, username, email, address, password, type}) => {
    const user = new User({name : name, username: username, address : address, email: email, password : password, type: type});
    
    return user.save();
}


module.exports.searchWithEmail = (email) => {
    return User.findOne({email: email });
}

/* 
module.exports.login()

module.exports.addFavorite = ({favorite, id}) => {

} */

module.exports.getUsers = ( ()=> {
    return User.find();
})