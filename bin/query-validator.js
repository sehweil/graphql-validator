#!/usr/bin/env node

/*
This is the CLI tool to validate scripts against a schema.  It uses the API found
in the src/ directory to validate all the files in the file glob CLI parameter.
 */

'use strict'

const program = require('commander')
const packagejson = require('../package.json')
const cli = require('../dist/cli')
const graphql = require('graphql')
var fs = require("fs")

program
  .version(packagejson.version)
  .usage(`[options] (<glob.graphql>)`)
  .option('-o, --output [pattern]', 'The file path where the merged schema will be outputted to.')
  .option('-s, --schema [pattern]', 'Use a file glob that defines a complete schema to validate against', '')
  .parse(process.argv)

if (!program.args.length || !program.schema) {
  program.outputHelp()
} else {
  cli.loadSchema(program.schema)
    .then((schema) => {
      var data = graphql.printSchema(schema);
      process.stdout.write(data);
      if (program.output) {
      fs.writeFile(program.output, data, (err) => {
        if (err) { 
          console.error('Error while copying the merged schema into the file. ',output ,err); 
        } else {
          console.log("Successfully written to the file.");
        }
      });
    }
    cli.validateQueries(program.args[0], schema);          
  }
    )
    .catch((err) => {
      console.error('The merged schema is not valid.', err);
      process.exit(1);
    })
}
