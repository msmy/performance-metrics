const fs = require('fs');
const zlib = require('zlib');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const fileSize = require('./fileSize');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('fileSize', () => {

  const sandbox = sinon.sandbox.create();
  const gzipStream = 'gzipSteam';
  const size = 98765;
  
  let fsCreateReadStreamStub;
  let fsCreateWriteStreamStub;
  let zlibCreateGzipStub;
  let streamPipeStub;
  let streamPipeReturn;
  let outputStream;
  
  beforeEach(() => {
    streamPipeReturn = sandbox.stub();
    streamPipeStub = sandbox.stub().returns({ pipe: streamPipeReturn });
    outputStream = { on: sandbox.stub() };

    fsCreateReadStreamStub = sandbox.stub(fs, 'createReadStream').returns({ pipe: streamPipeStub });
    fsCreateWriteStreamStub = sandbox.stub(fs, 'createWriteStream').returns(outputStream);
    zlibCreateGzipStub = sandbox.stub(zlib, 'createGzip').returns(gzipStream);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should resolve the correct filesize of a file', () => {
    sandbox.stub(fs, 'statSync').returns({ size: size });
    return expect(fileSize('some-file.txt')).to.eventually.equal(size);
  });

  it('should reject if no file is passed', () => {
    return expect(fileSize()).to.be.rejectedWith('No filename specified');
  });

  it('should reject if not a legal file', () => {
    return expect(fileSize('a-fake-file')).to.be.rejectedWith(Error);
  });

  it('should not call fsCreateReadStream', () => {
    sandbox.stub(fs, 'statSync').returns({ size: size });
    fileSize('some-file.txt');
    
    sinon.assert.notCalled(fsCreateReadStreamStub);
  });

  it('should not call fsCreateReadStream', () => {
    sandbox.stub(fs, 'statSync').returns({ size: size });
    fileSize('some-file.txt');
    
    sinon.assert.notCalled(fsCreateWriteStreamStub);
  });

  it('should not call zlib.createGzip', () => {
    sandbox.stub(fs, 'statSync').returns({ size: size });
    fileSize('some-file.txt');
    
    sinon.assert.notCalled(zlibCreateGzipStub);
  });

  context('gzip is true', () => {
    
    const filename = 'another-file.txt';
    let statSyncStub;

    beforeEach(() => {
      statSyncStub = sandbox.stub(fs, 'statSync').returns({ size: size });
      fileSize(filename, { gzip: true });
    });

    it('should call zlib.createGzip', () => {
      sinon.assert.called(zlibCreateGzipStub);
    });

    it('should call fs.createReadStream with input filename', () => {
      sinon.assert.calledWith(fsCreateReadStreamStub, filename);
    });

    it('should call fs.createWriteStream with correct output filename', () => {
      const outputFilename = `${filename}.gz`;
      sinon.assert.calledWith(fsCreateWriteStreamStub, outputFilename);
    });

    it('should call pipe with gzip stream', () => {
      sinon.assert.calledWith(streamPipeStub, gzipStream);
    });

    it('should call pipe on ouput stream', () => {
      sinon.assert.calledWith(streamPipeReturn, outputStream);
    });

    it('should attach an event listener onto finish', () => {
      sinon.assert.calledWith(outputStream.on, 'finish');
    });

    it('should call fs.statSync with gzipped file', () => {
      outputStream.on.args[0][1](); // manually call the callback
      sinon.assert.calledWith(statSyncStub, `${filename}.gz`);
    });

  });
});
