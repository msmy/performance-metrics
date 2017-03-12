const fs = require('fs');
const zlib = require('zlib');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

const modules = require('../modules/index');

const iterator = require('./iterator');

const expect = chai.expect;
chai.use(chaiAsPromised);

describe.only('iterator', () => {

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });
  
  describe('callModuleWithArgs', () => {
    
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
        resolve('yoyo');
      });

      moduleStub = sandbox.stub(modules, 'fileSize').returns(promise)
      res = iterator.callModuleWithArgs(modules.fileSize, item);
    });

    it('should call module with correct args', () => {
      sinon.assert.calledWith(moduleStub);
    });

    it.skip('should return a promise', () => {
      expect(res).to.eventually.equal(true);
    });
  });
});
