
exports.seed = function(knex) {
 
  const users = [
    {
      username: 'joeExotic',
      password: 'tigerKing!',
      role: 1,
    },
    {
      username: 'testAdmin',
      password: 'testPW',
      role: 1,
    },
    {
      username: 'testUser',
      password: 'pw12345',
      role: 2,
    },
    {
      username: 'random',
      password: 'thisISaTEST123'
    },
  ];
      return knex('users').insert(users);
};
