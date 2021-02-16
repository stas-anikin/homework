
module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'cohorts',
      username: 'stas',
      password: 'password'},
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations'
    },
    seeds:{
      directory: './db/seeds'
    }
}
  }
