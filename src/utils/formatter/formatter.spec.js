const expect = require('chai').expect;
const sinon = require('sinon');
const gitRevSync = require('git-rev-sync');

const formatter = require('./formatter');

describe('formatter', () => {
  describe('addLabels', () => {

    const sandbox = sinon.sandbox.create();

    const branch = 'some-branch';
    const app = 'performance-metrics';

    beforeEach(() => {
      sandbox.stub(gitRevSync, 'branch').returns(branch);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should return custom and default labels', () => {
      const customLabels = {"type": "css", "another": "label"};

      const expectedLabels = [
        customLabels,
        { branch },
        { app },
        { team: 'unknown' },
        { domain: 'nowtv' }
      ];
      expect(formatter.addLabels(customLabels)).to.deep.equal(expectedLabels);
    })
  });

  describe('toPromethesus', () => {
    it('should return a promethesus format', () => {
      const module = 'some-module';
      const res = 'some-res';
      const customLabels = {
        my: 'cool',
        amazing: 'labels'
      };
      const expectedResult = 'perf_metrics_some-module{my="cool",amazing="labels",branch="add-gzip-metric-to-filesize",app="performance-metrics",team="unknown",domain="nowtv"} some-res';
      expect(formatter.toPromethesus(module, res, customLabels)).to.equal(expectedResult);
    });
  });
});

//type="javascript" branch="feature-something", app="broadbandchecker", team="sales", domain="nowtv"}
