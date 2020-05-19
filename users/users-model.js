const db = require('../data/dbConnection.js');

module.exports = {
    get,
    getBy,
    getById,
    add
}

function get() {
    return db('users')
    .select('id', 'username')
};

function getBy(filter) {
    return db('users')
    .where(filter)
};

function getById(id){
    return db('users')
    .where('id', id)
    .first();
};

function add(user){
    return db('users')
    .insert(user, 'id')
    .then(ids => {
        return getById(ids[0])
    });
};