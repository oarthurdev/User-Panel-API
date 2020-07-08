exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
      table.string('name').notNullable();
      table.date('birth_date').notNullable();
      table.string('secret_question').notNullable();
      table.string('secret_answer').notNullable();
      table.string('network_ip');
      table.boolean('activated').notNullable();
      table.uuid('token');
      table.binary('profile_picture').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
  }