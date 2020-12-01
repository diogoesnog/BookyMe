const User = require('../models/user');


// TODO: atualizar infos, mudar de pass, addFavorites
module.exports.createUser = ({name, username, email, address, password, type}) => {
    const user = new User({name : name, username: username, address : address, email: email, password : password, type: type});
    
    return user.save();
}

module.exports.updateNameAddress = (user,id) => {
    return User.findByIdAndUpdate(id,user,{new:true});
}

module.exports.findById = (id) => {
    return User.findById(id);
}


module.exports.updateEmail = (id, email) =>  {
    return User.findByIdAndUpdate(id, {email: email}, {new: true});
}

module.exports.updatePassword = (id, password) => {
    return User.findByIdAndUpdate(id, {password: password}, {new: true});
}


module.exports.getUsers = ( ()=> {
    return User.find();
})