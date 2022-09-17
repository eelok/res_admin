module.exports = {
  "development": {
    "username": "postgres1",
    "password": "goodPassword",
    "database": "res_admin",
    "host": "127.0.0.1",
    "port": "5433",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "port": "5433",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "port": "5433",
    "dialect": "postgres"
  }
}
