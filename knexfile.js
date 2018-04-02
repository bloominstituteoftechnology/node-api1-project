module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './data/cs8.sqlite3' },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './data/seeds' },
  },
};
