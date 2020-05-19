
exports.seed = function(knex) {

  const roles = [
    {
      name: 'admin', //id 1
    },
    {
      name: 'user', //id 2
    },
  ];
      return knex('roles').insert(roles);
};