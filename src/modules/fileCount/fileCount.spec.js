const fs = require('fs');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const expect = chai.expect;
chai.use(chaiAsPromised);

const fileCount = require('./fileCount');

describe('fileCount', () => {
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  it('should resolve the correct number of files in a specified folder', () => {
    sandbox.stub(fs, 'readdirSync').returns([1,1,1,1]);
    return expect(fileCount('/valid-folder')).to.eventually.equal(4);
  });

  it('should reject if no folder is passed', () => {
    return expect(fileCount()).to.be.rejectedWith('No folder specified');
  });

  it('should throw an error if not a legal folder', () => {
    return expect(fileCount('a-fake-folder')).to.be.rejectedWith(Error);
  });
});
