import { Command } from 'commander';
import {access} from 'fs/promises';
const program = new Command();
program.version('1.0.0');
program.description('A CLI to generate a monorepo structure with Nx and Lerna');
program.option('-n, --new <project-name>', 'Create a new Nx workspace with a monorepo structure');
program.option('-a, --add <layer-name>', 'Add a new layer to the monorepo structure');
program.option('-r, --remove <layer-name>', 'Remove a layer from the monorepo structure');
program.option('-h, --help', 'List all the commands available');
program.option('-v, --version', 'Show the current version of the CLI');


program.on('command:*', function () {
  console.error('Invalid command: %s\nSee --help for a list of available commands.', program.args.join(' '));
  program.help();
});

function validateNewOption(value){
  if(!value || value.trim() === ''){
    console.log('Please specify a project name');
    process.exit();
  }
  return value;
}

program.on('option:new', validateNewOption)

async function validateAddOption(value){
  if(!value || value.trim() === ''){
    console.log('Please specify a layer name');
    process.exit();
  }
  try {
    await access(`./packages`);
    return value;
  } catch {
    console.log('It seems that you are not in the root folder of the monorepo structure');
    process.exit();
  }
}

program.on('option:add', validateAddOption)

program.on('option:version', function(){
  console.log('CLYNT version 1.0.0');
  process.exit();
});

program.on('option:help', function(){
  program.help();
  process.exit();
});


if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv);

export default program;
