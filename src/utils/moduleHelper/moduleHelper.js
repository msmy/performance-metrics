const callModuleWithArgs = (fn, module, item) => {
  const labels = item.labels;
  const args = item.args;
  
  return fn.apply(this, args).then(res => {
      return { res, labels, module };
  });
};

const runThroughModules = (modules, items) => {

};

module.exports = {
  callModuleWithArgs,
  runThroughModules
};
