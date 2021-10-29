const { Sequelize, QueryTypes } = require('sequelize');
const config = require('../config/config');

// eslint-disable-next-line no-console
console.log(config);

const sequelize = new Sequelize(config);

function log(message, queryObject, logs) {
  // eslint-disable-next-line no-console
  console.log(message);
  logs.push(message);
}

const test = {
  ping: async () => {
    const logs = [];

    try {
      await sequelize.authenticate();
      log('Connection has been established successfully.', null, logs);
    } catch (error) {
      log('Unable to connect to the database:', null, logs);
      log(error, null, logs);
    }
    sequelize.close();
    return logs;
  },
  test_projects: async () => {
    const logs = [];

    try {
      const project = await sequelize.query('SELECT * FROM `wp_ipc_projects ` LIMIT 1', {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.
        logging: (sql, queryObject) => {
          log(sql, queryObject, logs);
        },

        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: true,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT,
      });

      if (project && project.length > 0) {
        log('Connection to wp_ipc_projects table has been established successfully.', null, logs);
        log(project[0], null, logs);
      } else {
        log(
          'Connection to wp_ipc_projects table was established, but no data was returned.',
          null,
          logs
        );
      }
    } catch (error) {
      log('Unable to connect to wp_ipc_projects table:', null, logs);
      log(error, null, logs);
    }
    sequelize.close();
    return logs;
  },
  test_documents: async () => {
    const logs = [];

    try {
      const document = await sequelize.query('SELECT * FROM `wp_ipc_documents_api ` LIMIT 1', {
        // A function (or false) for logging your queries
        // Will get called for every SQL query that gets sent
        // to the server.

        logging: (sql, queryObject) => {
          log(sql, queryObject, logs);
        },

        // If plain is true, then sequelize will only return the first
        // record of the result set. In case of false it will return all records.
        plain: true,

        // Set this to true if you don't have a model definition for your query.
        raw: true,
        type: QueryTypes.SELECT,
      });

      if (document && document.length > 0) {
        log(
          'Connection to wp_ipc_documents_api table has been established successfully.',
          null,
          logs
        );
        log(document[0], null, logs);
      } else {
        log(
          'Connection to wp_ipc_documents_api table was established, but no data was returned.',
          null,
          logs
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      log('Unable to connect to wp_ipc_documents_api table:', null, logs);
      log(error, null, logs);
    }
    sequelize.close();
    return logs;
  },
  test_relevant_representations: async () => {
    const logs = [];

    try {
      const relevantRepresentation = await sequelize.query(
        'SELECT * FROM `wp_ipc_representations ` LIMIT 1',
        {
          // A function (or false) for logging your queries
          // Will get called for every SQL query that gets sent
          // to the server.

          logging: (sql, queryObject) => {
            log(sql, queryObject, logs);
          },

          // If plain is true, then sequelize will only return the first
          // record of the result set. In case of false it will return all records.
          plain: true,

          // Set this to true if you don't have a model definition for your query.
          raw: true,
          type: QueryTypes.SELECT,
        }
      );

      if (relevantRepresentation && relevantRepresentation.length > 0) {
        log(
          'Connection to wp_ipc_representations table has been established successfully.',
          null,
          logs
        );
        log(relevantRepresentation[0], null, logs);
      } else {
        log(
          'Connection to wp_ipc_representations table was established, but no data was returned.',
          null,
          logs
        );
      }
    } catch (error) {
      log('Unable to connect to wp_ipc_documents_api table:', null, logs);
      log(error, null, logs);
    }
    sequelize.close();
    return logs;
  },
  runAll: async () => {
    const allLogs = [];

    allLogs.push(this.ping());
    allLogs.push(this.project());
    allLogs.push(this.document());
    allLogs.push(this.relevantRepresentation());

    return allLogs;
  },
};

module.exports = test;
