const flatten = require('lodash/flatten');

const modules = require('./modules/index');
const formatter = require('./utils/formatter/formatter');
const iterator = require('./utils/iterator/iterator');
const configFile = process.env.CONFIG ? process.cwd() + '/' + process.env.CONFIG : '../config.example.json';

const config = require(configFile);

const moduleKeys = Object.keys(modules);

const promisesToRun = Object.keys(config).map(k => {
  const module = k;
  const moduleExists = moduleKeys.indexOf(module) > -1;
  const items = config[k];
  // console.log('key is', k);
  // console.log('module is', items);
  if(moduleExists) {
    return items.map((v) => {
        return iterator.callModuleWithArgs(modules[module], module, v);
    });
  }

});

Promise.all(flatten(promisesToRun)).then((vals) => {
  const results = vals.map((v) => {
    return formatter.toPromethesus(v.module, v.res, v.labels);
  });
  process.stdout.write(results.join("\n") + "\n");
});

