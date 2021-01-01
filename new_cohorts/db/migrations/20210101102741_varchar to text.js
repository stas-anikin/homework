exports.up = function(knex) { //need to update the members column from the default 255 to 1000 to allow for larger groups
    return knex.schema.alterTable('cohorts', table => {
      table.string('members', 1000).alter()
    })
  };
  exports.down = function(knex) {   //reverting the change above
    return knex.schema.alterTable('cohorts', table=>{
        table.string('members, 255').alter()
    });
  };