"use strict";

const gitRevSync = require('git-rev-sync');

const app = require(process.cwd() + '/package.json').name;

const addLabels = (labels) => {
  const branch = gitRevSync.branch();
  const team = process.env.TEAM || 'unknown';
  const domain = process.env.DOMAIN || 'nowtv';

  return [
    labels,
    { branch },
    { app },
    { team },
    { domain }
  ];
};

const flattenLabels = (labels) => {
  return labels
      .map(v => {
        const key = Object.keys(v)[0];
        return `${key}="${v[key]}"`;
      })
      .join(',');
};

const toPromethesus = (module, res, customLabels) => {
  const METRIC_NAME='perf_metrics';
  const labels = addLabels(customLabels);

  return `${METRIC_NAME}_${module}{${flattenLabels(labels)}} ${res}`;
};

module.exports = {
  toPromethesus,
  addLabels
};
