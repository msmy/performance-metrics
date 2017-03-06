"use strict";

const modules = require('./modules/index');
const formatter = require('./utils/formatter');
const configFile = process.env.CONFIG ? process.cwd() + '/' + process.env.CONFIG : '../config.example.json';

const config = require(configFile);

const moduleKeys = Object.keys(modules);

let result = [];

Object.keys(config).forEach(k => {
  const module = k;
  const moduleExists = moduleKeys.indexOf(module) > -1;
  const items = config[k];
  // console.log('key is', k);
  // console.log('module is', items);
  if(moduleExists) {
    items.forEach((v) => {
      const args = v.args;
      const labels = v.labels;
      // console.log('args', args);
      const res = modules[module].apply(this, args);
      const formattedResult = formatter.toPromethesus(module, res, labels);

      result.push(formattedResult);
    });
  }
});

process.stdout.write(result.join("\n") + "\n");
