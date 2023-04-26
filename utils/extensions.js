const createExtensionsRegExp = (rawRegExp) => {
  return new RegExp(`${rawRegExp}$`);
}

module.exports = { createExtensionsRegExp }
