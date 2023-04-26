# eslint-plugin-file-structure-control

Eslint plugin for linting file structure

## Installation

```
npm i --save-dev eslint-plugin-file-structure-control
```

## Usage

Create an .eslint.json file with the following:

```
"plugins": [
    "file-structure-control"
]
```

Then, you can add the custom rules to the .eslint.json file:

```
"rules": {
  "file-structure-control/sync-relative-files": "error"
}
```

To lint your project with ESLint, add the following script to your package.json:

```
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

and run the linter with:

```
npm run lint
```

## Rules

#### file-structure-control/sync-relative-files

Config example:

```
 "file-structure-control/sync-relative-files": ["error", {
      relations: {
        '.test.tsx': ['.tsx'],
        '.test.ts': ['.ts'],
        '.classes.ts': ['.tsx'],
      },
    }],
```

Examples of incorrect code for this rule:

```
/components
  /Time.classes.ts
  /Times.tsx <--- correct Time.tsx
/utils
  /time.test.ts
  /time-utils.ts  <--- correct time.ts
```

Examples of correct code for this rule:

```
/components
  /Time.tsx
  /Time.classes.ts
/utils
  /time.test.ts
  /time.ts
```
