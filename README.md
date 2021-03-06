# graphql-validator

A CLI tool to validate queries against a GraphQL Schema.  The primary use case for this tool is to validate schema changes against an existing query store.

## Installation

To use the validator as a command line tool

```sh
npm install -g graphql @creditkarma/graphql-validator
```

To use the validator locally in a project

```sh
npm install --save graphql @creditkarma/graphql-validator
```

## Usage

Given the following files

schema/schema.graphql

```
schema {
  query: RootQuery
}
```

schema/rootQuery.graphql

```
type RootQuery {
  testString: String
}
```

queries/test.graphql

```
{testString}
```

### Validate the query

Validate the query with the following code:

```js
const loadSchema = require('@creditkarma/graphql-loader')
const validator = require('@creditkarma/graphql-validator')

loadSchema('./schema/*.graphql', (err, schema) => {
  validator.validateQueryFiles('./queries/*.graphql', schema, (errors) => {
    if (errors) {
         console.log('errors', errors);
    } else {
        console.log('All queries validated');
    }
  })
})
```

Validate the query using promises:

```js
const loadSchema = require('@creditkarma/graphql-loader')
const validator = require('@creditkarma/graphql-validator')

loadSchema('./schema/*.graphql').then((schema) => {
  validator.validateQueryFiles('./queries/*.graphql', schema).then((results) => {
    console.log(results)
  })
})
```

##### Validate query using CLI tool

```sh
> graphql-validator -s "./schema/**/*.graphql" "./queries/*.graphql"
```

The validator will first load and validate the schema, throwing errors if the schema isn't valid.  Then it will check each query in the file glob by parsing the query and validating it against the schema.  If errors are found, the will be displayed by file name and exit with exit code 1.

##### Output the merged schema into a file with the CLI tool

```sh
> graphql-validator -s "./schema/**/*.graphql" -o "yourMergedSchemaFileName.graphql" "./queries/*.graphql"
```

The will merge all the schema given in the `"./schema/**/*.graphql"` glob and output it into `"yourMergedSchemaFileName.graphql"`

*Note:* you must use quotes around each file glob or the utility will not work properly.

## Development

Install dependencies with

```sh
npm install
npm run typings
```

### Build

```sh
npm run build
```


### Run test in watch mode

```sh
npm run test:watch
```

## Contributing
For more information about contributing new features and bug fixes, see our [Contribution Guidelines](https://github.com/creditkarma/CONTRIBUTING.md).
External contributors must sign Contributor License Agreement (CLA)

## License
This project is licensed under [Apache License Version 2.0](./LICENSE)
