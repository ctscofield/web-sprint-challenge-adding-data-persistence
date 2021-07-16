
exports.up = async function(knex) {
  await knex.schema
    .createTable('projects', table => {
      table.increments('project_id')
      table.string('project_name', 400).notNullable()
      table.string('project_description')
      table.string('project_completed').defaultTo('false')
    })
    .createTable('resources', table => {
      table.increments('resource_id')
      table.string('resource_name', 400).notNullable().unique()
      table.string('resource_description', 500)
    })
    .createTable('tasks', table => {
      table.increments('task_id')
      table.string('task_description', 400).notNullable()
      table.string('task_notes')
      table.string('task_completed').defaultTo('false')
      table.integer('project_id')
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
    })
    .createTable('project_resources', table => {
      table.increments('p_r_id')
      table.integer('list_id')
      table.integer('project_id')
        .references('project_id')
        .inTable('projects')
      table.integer('resources_id')
        .references('resource_id')
        .inTable('resources')
    })
};

exports.down = async function(knex) {
  await knex.schema
    .dropTableIfExists('project_resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
};
