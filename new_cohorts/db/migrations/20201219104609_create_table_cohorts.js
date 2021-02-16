exports.up = function(knex) { //here we are creating a table with all the required colums
    return knex.schema.createTable('cohorts', table => {
      table.increments('id');
      table.string('name');
      table.string('logo_url');
      table.string('members')
    })
  };
  exports.down = function(knex) {   //here we are deleting the table we created above
    return knex.schema.dropTable('cohorts');
  };
  