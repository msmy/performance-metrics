const fs = require('fs');

const expect = require('chai').expect;
const sinon = require('sinon');

const fileCount = require('./fileCount');

describe('fileCount', () => {
  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  it('should return the correct number of files in a specified folder', () => {
    sandbox.stub(fs, 'readdirSync').returns([1,1,1,1]);
    expect(fileCount('/valid-folder')).to.equal(4);
  });

  it('should return undefined if no folder is passed', () => {
    expect(fileCount()).to.be.undefined;
  });

  it('should throw an error if not a legal folder', () => {
    expect(() => { getFileSize('a-fake-folder') }).to.throw(Error);
  });
});
