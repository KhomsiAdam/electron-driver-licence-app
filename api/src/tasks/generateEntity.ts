import inquirer from 'inquirer';
import * as fs from 'fs';
// import { dirname } from 'path';
// import { fileURLToPath } from 'url';
import createEntityFolder from './createEntityFolder';
import replaceEntityFiles from './replaceEntityFiles';
const CURR_DIR = process.cwd();
console.log(CURR_DIR);

// @ts-ignore
// const __dirname = dirname(fileURLToPath(import.meta.url));

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
  {
    name: 'entity-choice',
    type: 'list',
    message: 'What entity template would you like to generate?',
    choices: CHOICES,
  },
  {
    name: 'entity-name',
    type: 'input',
    message: 'Entity name:',
    validate: function (input: any) {
      if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
      else return 'Entity name may only include letters, numbers, underscores and hashes.';
    },
  },
];

inquirer.prompt(QUESTIONS).then(answers => {
  const entityChoice = answers['entity-choice'];
  const entityName = answers['entity-name'];
  const templatePath = `${__dirname}/templates/${entityChoice}`;
  console.log(templatePath);
  const entitiesPath = `${CURR_DIR}/src/entities/${entityName.toLowerCase()}`;
  fs.mkdirSync(`${entitiesPath}`);
  console.log(entitiesPath);

  createEntityFolder(templatePath, entitiesPath);
  replaceEntityFiles(entitiesPath, entityName.toLowerCase());
});
