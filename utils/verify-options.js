const verifyOptions = (options) => {
  if (!options) {
    return;
  }

  const config = options[0];
  if (!config) {
    return;
  }

  if (typeof config.relations !== 'object') {
    throw new Error('Wrong options: "relations" should be object');
  }

  const relationValues = Object.values(config.relations);
  relationValues.forEach(values => {
    if (!values) {
      return;
    }

    const isValidValues = (
      typeof values === 'string' ||
      Array.isArray(values) && values.every(value => typeof value === 'string')
    );

    if (!isValidValues) {
      throw new Error('Wrong options: "relations" values should be string or string array');
    }
  })

  if (config.excludes && (
    !Array.isArray(config.excludes) ||
    (config.excludes).some(pattern => typeof pattern !== 'string')
  )) {
    throw new Error('Wrong options: "patterns" should be string array');
  }
}

module.exports = {verifyOptions}
