const callModuleWithArgs = (module, item) => {
  const labels = item.labels;
  const args = item.args;

  return module.apply(this, args).then(res => {
    return { res, labels };
  });
};

module.exports = {
  callModuleWithArgs
};
