const modules = require('./modules/index');
const formatter = require('./utils/formatter');
const configFile = process.env.CONFIG ? process.cwd() + '/' + process.env.CONFIG : '../config.example.json';

const flatten = require('lodash/flatten');

const config = require(configFile);

const moduleKeys = Object.keys(modules);

let result = [];

let promises = [];

const promisesToRun = Object.keys(config).map(k => {
  const module = k;
  const moduleExists = moduleKeys.indexOf(module) > -1;
  const items = config[k];
  // console.log('key is', k);
  // console.log('module is', items);
  if(moduleExists) {
    return items.map((v) => {
      const args = v.args;
      const labels = v.labels;
      // console.log('args', args);
      return modules[module].apply(this, args);
    });
  }

});

console.log(flatten(promisesToRun));

Promise.all(flatten(promisesToRun)).then((vals) => {
  const results = vals.map((v) => {
    console.log(v);
    return formatter.toPromethesus(module, v, {});
  });
  process.stdout.write(results.join("\n") + "\n");
});

