/* eslint-disable no-restricted-syntax */
const Sequelize = require('sequelize');
const tcpp = require('tcp-ping');
const config = require('../config/config');
const db = require('../../src/models');

const sequelize = new Sequelize(config);
const errorPrefix = 'ERROR:';
const warningPrefix = 'WARNING:';

// eslint-disable-next-line no-unused-vars
function logMessage(message) {
  // eslint-disable-next-line no-console
  console.log(message);
  return message;
}

function errorMessage(error) {
  // eslint-disable-next-line no-console
  console.error(`${errorPrefix} ${error}`);
  return `${errorPrefix} ${error}`;
}

function warningMessage(warning) {
  // eslint-disable-next-line no-console
  console.log(`${warningPrefix} ${warning}`);
  return `${warningPrefix} ${warning}`;
}

module.exports = {
  async ping() {
    const logs = [];

    const testHosts = [
      { host: 'www.google.com', port: 80 },
      { host: config.host, port: config.port },
    ];

    try {
      for await (const host of testHosts) {
        tcpp.probe(host.host, host.port, (err, available) => {
          if (available) {
            logs.push(logMessage(`Successfully connected to ${host.host} on port ${host.port}`));
          } else {
            logs.push(errorMessage(`Unable to connect to ${host.host} on port ${host.port}`));
            logs.push(errorMessage(err));
          }
        });
      }
    } catch (error) {
      logs.push(errorMessage('Unable to test connections.'));
      logs.push(errorMessage(error));
    }

    return logs;
  },
  async dbPing() {
    const logs = [];
    try {
      await sequelize.authenticate();
      logs.push(logMessage('Database connection has been established successfully.'));
    } catch (error) {
      logs.push(errorMessage('Unable to connect to the database.'));
      logs.push(errorMessage(error));
    }

    return logs;
  },
  async test_projects() {
    const logs = [];

    try {
      const project = await db.Project.findAll({
        limit: 1,
      });

      if (project && project.length > 0) {
        logs.push(
          logMessage('Connection to wp_ipc_projects table has been established successfully.')
        );
        logs.push(logMessage(project[0]));
      } else {
        logs.push(
          warningMessage(
            'Connection to wp_ipc_projects table was established, but no data was returned.'
          )
        );
      }
    } catch (error) {
      logs.push(errorMessage('Unable to connect to wp_ipc_projects table:'));
      logs.push(errorMessage(error.message));
    }

    return logs;
  },
  // To be uncommented when models established.
  // async test_documents() {
  //   const logs = [];

  //   try {
  //     const document = await db.Document.findAll({
  //       limit: 1,
  //     });

  //     if (document && document.length > 0) {
  //       logs.push(
  //         logMessage('Connection to wp_ipc_documents_api table has been established successfully.')
  //       );
  //       logs.push(logMessage(document[0]));
  //     } else {
  //       logs.push(
  //         warningMessage(
  //           'Connection to wp_ipc_documents_api table was established, but no data was returned.'
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     logs.push(errorMessage('Unable to connect to wp_ipc_documents_api table:'));
  //     logs.push(errorMessage(error.message));
  //   }

  //   return logs;
  // },
  // async test_relevant_representations() {
  //   const logs = [];

  //   try {
  //     const relevantRepresentations = await db.RelevantRepresentation.findAll({
  //       limit: 1,
  //     });

  //     if (relevantRepresentations && relevantRepresentations.length > 0) {
  //       logs.push(
  //         logMessage('Connection to wp_ipc_relreps table has been established successfully.')
  //       );
  //       logs.push(logMessage(relevantRepresentations[0]));
  //     } else {
  //       logs.push(
  //         warningMessage(
  //           'Connection to wp_ipc_relreps table was established, but no data was returned.'
  //         )
  //       );
  //     }
  //   } catch (error) {
  //     logs.push(errorMessage('Unable to connect to wp_ipc_relreps table:'));
  //     logs.push(errorMessage(error.message));
  //   }

  //   return logs;
  // },
  async runAll() {
    const allLogs = [];

    // only run ping test on remote environments
    if (process.env.NODE_ENV !== 'local') {
      const pingTest = await this.ping(); // Test that the API can connect to the internet, then test it can connect to the NSIP host machine
      allLogs.push(pingTest);

      if (pingTest.join('|').includes(errorPrefix)) {
        return allLogs;
      }
    }

    const dbPingTest = await this.dbPing(); // Test that the API can connect to the DB on the NSIP host machine
    allLogs.push(dbPingTest);

    if (dbPingTest.join('|').includes(errorPrefix)) {
      return allLogs;
    }

    const projectTest = await this.test_projects(); // Test that the API can connect to the projects table
    allLogs.push(projectTest);

    // To be uncommented when models established.
    // if (projectTest.join('|').includes(errorPrefix)) {
    //   return allLogs;
    // }

    // const documentsTest = await this.test_documents(); // Test that the API can connect to the documents table
    // allLogs.push(projectTest);

    // if (documentsTest.join('|').includes(errorPrefix)) {
    //   return allLogs;
    // }

    // const relevantRepresentationsTest = await this.test_relevant_representations(); // Test that the API can connect to the relevant reps table
    // allLogs.push(relevantRepresentationsTest);

    return allLogs;
  },
};
