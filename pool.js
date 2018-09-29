var pg = require('pg');

var config = {
  user: 'ryicxxdmhqnnga',
  database: 'd7k9jq0uab3ac2',
  password: '977afe3e6d5afadcc511736e7c8ac65bada421cb230546ba863954dc406bf1d9',
  host: 'ec2-174-129-18-98.compute-1.amazonaws.com',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 50000,
};


var pool = new pg.Pool(config);
module.exports = pool;