
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { 
          uuid: '98304354-86dc-42b6-b86a-21b6c8ba0404',
          username: 'oarthurdev', 
          password: '78124770', 
          email: 'oarthurdev@gmail.com',
          name: 'Arthur Wagenknecht', 
          birth_date: '12/10/1995 12:02:30', 
          secret_question: 'Qhats is your social number?', 
          secret_answer: '0993295290', 
          network_ip: '192.168.0.1', 
          activated: true},
        ]);
    });
};
