const {checkExistFile} = require("./utils/files");
const {verifyOptions} = require("./utils/verify-options");
const {createPathRegExp} = require("./utils/paths");
const {createExtensionsRegExp} = require("./utils/extensions");

module.exports = {
  rules: {
    "sync-relative-files": {
      create: (context) => {
        const {options} = context;

        verifyOptions(options);

        const config = options[0];
        if (!config) {
          return {}
        }

        return {
          'Program': (node) => {
            const filename = context.getFilename();
            const excludeRegExps = (config.excludes || []).map(createPathRegExp);
            const shouldIgnoreFile = excludeRegExps.some(regExp => regExp.test(filename));
            if (shouldIgnoreFile) {
              return;
            }

            const relations = Object.entries(config.relations);
            relations.forEach(([postfix, rawPostfixRelations]) => {
              const postfixRelations = typeof rawPostfixRelations === "string" ? [rawPostfixRelations] : rawPostfixRelations;

              const postfixRegExp = createExtensionsRegExp(postfix);
              if (!postfixRegExp.test(filename)) {
                return;
              }

              const isExistPairFile = postfixRelations.some(postfixRelation => {
                const relationFilename = filename.replace(postfix, postfixRelation);
                return checkExistFile(relationFilename);
              });

              if (!isExistPairFile) {
                context.report(
                  node,
                  `Not found relation file of ${filename} with extensions: ${postfixRelations.map(postfix => `"${postfix}"`).join(', ')}`
                );
              }
            });
          },
        };
      },
    },
  },
};
