const { JsonDB } = require('node-json-db');
const { Config } = require('node-json-db/dist/lib/JsonDBConfig');

const path = './src/server/db/db';

var db = new JsonDB(new Config(path, true, true, '/'));

module.exports = { db };
