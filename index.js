#!/usr/bin/env node

import program from './src/cmd/commander.js';
import prompt from 'prompts';
import chalk from 'chalk';
import boxen from 'boxen';
import { licencesPrompt, useDefaultLayer, ListOfSpecifiLayers } from './src/cmd/prompt.js';
import {  createRootWorkspaceJson, buildLayers, createFolder } from './src/cmd/builder.js';
import { checkYarn } from './src/cmd/checker.js';
import { CLYNT } from './src/cmd/figlet.js';

CLYNT();

const options = program.opts();
async function run(){
  try{
await checkYarn();
} catch {
  console.log('Yarn is not installed. Please install yarn to continue');
  process.exit();
}
if (options.new) {
  let layers = [];
  const { author } = await prompt({
    type: 'text',
    name: 'author',
    message: 'Author name',
    validate: (value) => (value ? true : value = "unknown" ),
  }, {
    onCancel: () => {
      process.exit();
    },
  });
  const { licence } = await licencesPrompt();
  if (await useDefaultLayer()) {
    layers = ['domain', 'application', 'infrastructure'];
  } else {
     layers = await ListOfSpecifiLayers();
  }
  await createFolder(options.new);
  process.chdir(options.new); 
  await createRootWorkspaceJson({name: options.new, author, licence,layers});
  await buildLayers({names: layers, author});
  console.log(boxen(`
  Workspace created ${chalk.greenBright('successfully')}!
  run ${chalk.cyanBright(`cd ${options.new} && yarn start`)}
  if ${layers[1]} depends on ${layers[0]} 
  add in the ${layers[1]} package.json "dependencies" the following:
  ${chalk.cyanBright(`"${layers[0]}": "*"`)}
  And so on...
  ${chalk.cyanBright('Have fun!')}
  `,
    {borderColor: "cyan", title: `${options.new}`, titleAlignment: "center", padding: 1, margin: 1, borderStyle:"double"}));
}
if (options.add) {
  console.log('add');
}
}

run();