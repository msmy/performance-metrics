const expect = require('chai').expect;
const sinon = require('sinon');
const gitRevSync = require('git-rev-sync');

const formatter = require('./formatter');

describe('formatter', () => {
  describe('addDefaults', () => {

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
      const customLabels = {"type": "css"};

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
});

//type="javascript" branch="feature-something", app="broadbandchecker", team="sales", domain="nowtv"}
