exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(table) {
      table.increments();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('email').notNullable();
      table.string('nickname').notNullable();
      table.string('name').notNullable();
      table.string('role').notNullable();
      table.string('registered_by');
      table.string('social_network');
      table.string('link_social_network');
      table.boolean('activated').notNullable();
      table.uuid('token');
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
  }