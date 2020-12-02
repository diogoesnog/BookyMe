const User = require('../models/user');


// TODO: addFavorites, addPicture, password
module.exports.createUser = ({name, username, email, address, city,zipCode, password, type}) => {
    const user = new User({name : name, username: username, address : address, city: city, zipCode: zipCode, email: email, password : password, type: type});
    
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

module.exports.deleteAll = () => {
    return User.deleteMany();
}

module.exports.getUsers = ( ()=> {
    return User.find();
})