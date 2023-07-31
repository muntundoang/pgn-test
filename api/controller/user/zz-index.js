module.exports = {
    add: require('./create/register'),
    delete: require ('./delete/deleteUser'),
    update: require ('./update/userUpdate'),
    login: require('./read/login'),
    absen: require('./create/absen'),
    getUser: require('./read/getUser'),
    getAllUser: require('./read/getAllUser')
}