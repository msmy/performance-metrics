const fs = require('fs');
const zlib = require('zlib');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const modules = require('../../modules/index');

const moduleHelper = require('./moduleHelper');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('moduleHelper', () => {

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });
  
  describe('callModuleWithArgs', () => {
    
    const resVal = 'yoyo';
    const moduleName = 'some-module';

    let moduleStub;
    let item;
    let promise;
    let res;

    beforeEach(() => {
      item = {
        args: ['loads', 'of', 'args' ],
        labels: { some: 'label' }
      };

      promise = new Promise((resolve, reject) => {
        resolve(resVal);
      });

      moduleStub = sandbox.stub(modules, 'fileSize').returns(promise)
      res = moduleHelper.callModuleWithArgs(modules.fileSize, moduleName, item);
    });

    it('should call module with correct args', () => {
      sinon.assert.calledWith(moduleStub);
    });

    it('should return a promise', () => {
      return expect(res).to.eventually.deep.equal({ res: resVal, labels: item.labels, module: moduleName });
    });
  });

  describe('runThroughModules', () => {

  });
});
