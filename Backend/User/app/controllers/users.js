const User = require('../models/user');


// TODO:  login, atualizar infos, mudar de pass, addFavorites
module.exports.createUser = ({name, username, email, address, password, type}) => {
    const user = new User({name : name, username: username, address : address, email: email, password : password, type: type});
    
    return user.save();
}


module.exports.searchWithEmail = (email) => {
    return User.findOne({email: email });
}

module.exports.searchWithEmailOrUsername = (emailOrUsername) => {
    return User.findOne({$or: [{username: emailOrUsername}, {email:emailOrUsername}]});
}


module.exports.getUsers = ( ()=> {
    return User.find();
})