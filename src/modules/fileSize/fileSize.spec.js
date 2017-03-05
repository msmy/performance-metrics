const fs = require('fs');

const expect = require('chai').expect;
const sinon = require('sinon');

const fileSize = require('./fileSize');

describe('fileSize', () => {

  const sandbox = sinon.sandbox.create();

  afterEach(() => {
    sandbox.restore();
  });

  it('should return the correct filesize of a file', () => {
    const size = 98765;
    sandbox.stub(fs, 'statSync').returns({ size: size });

    const filename = 'package.json';
    expect(fileSize(filename)).to.equal(size);
  });

  it('should return undefined if no file is passed', () => {
    expect(fileSize()).to.be.undefined;
  });

  it('should throw an error if not a legal file', () => {
    expect(() => { fileSize('a-fake-file') }).to.throw(Error);
  });
});
