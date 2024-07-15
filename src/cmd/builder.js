import { writeFile, readFile, mkdir, access } from 'fs/promises';
import { join } from 'path';
import chalk from 'chalk';
import boxen from 'boxen';
const templatePath = join(import.meta.dirname, 'template');

async function createRootWorkspaceJson({name, author, layers}){
  const layersWorksSpace = await layersWorksPace(layers);
   await createFolder('packages');
    let packageJson = await readFile(`${templatePath}/root/package.json.txt`, 'utf8');
  packageJson = packageJson.replace(/{{name}}/g, name);
  packageJson = packageJson.replace(/{{author}}/g, author);
  await writeFile('./package.json', packageJson);

  const files = [ '.gitignore', 'tsconfig.json', 'nx.json', 'lerna.json'];

  for (let i = 0; i < files.length; i++) {
    let file = await readFile(`${templatePath}/root/${files[i]}.txt`, 'utf8');
    await writeFile(`./${files[i]}`, file);
  }

  let workspace = await readFile(`${templatePath}/root/default.code-workspace.txt`, 'utf8');
  workspace = workspace.replace(/{{name}}/g, name);
  workspace = workspace.replace(/{{layers}}/g, layersWorksSpace);
  await writeFile('./default.code-workspace', workspace);
}

 async function CreateLayer({name, author}){
  await createFolder(`packages/${name}`);
  await createFolder(`packages/${name}/src`);
  await createFolder(`packages/${name}/tests`);
  let packageJson = await readFile(`${templatePath}/layer/package.json.txt`, 'utf8');
  packageJson = packageJson.replace(/{{name}}/g, name);
  packageJson = packageJson.replace(/{{author}}/g, author);
  await writeFile(`./packages/${name}/package.json`, packageJson);
  
  const files = [ 'tsconfig.json', 'tsconfig.build.json', '.gitignore', 'rollup.config.js'];

  for (let i = 0; i < files.length; i++) {
    let file = await readFile(`${templatePath}/layer/${files[i]}.txt`, 'utf8');
    await writeFile(`./packages/${name}/${files[i]}`, file);
  }

  let index = await readFile(`${templatePath}/layer/index.ts.txt`, 'utf8');
  index = index.replace(/{{name}}/g, name);
  await writeFile(`./packages/${name}/src/index.ts`, index);
}

async function createFolder (name){
 try {
    await access(name);
    console.log(`folder ${name} already exists`);
    process.exit();
 } catch {
   await mkdir(name);
 }
}


async function buildLayers({names, author}){
  for (let i = 0; i < names.length; i++) {
    await CreateLayer({
      name: names[i],
      author
    })
  }
}

async function layersWorksPace(layers){
  let text = '';
  for (let i = 0; i < layers.length; i++) {
    text += `{
      "name": "${layers[i]}",
      "path": "packages/${layers[i]}"
    },${i === layers.length - 1 ? '' : '\n'}`
  }
  return text;
}

async function hasPackagesFolder(){
  try {
    await access(`./packages`);
    return true;
  } catch {
    console.log(boxen(`
      ${chalk.redBright('It seems that you are not in the root folder of the monorepo structure')}
    `,));
    process.exit();
  }
}

async function getAuthorName(){
  const packageJson = await readFile(`./package.json`, 'utf8');
  return JSON.parse(packageJson).author;
}


export {
  createRootWorkspaceJson,
  buildLayers,
  createFolder,
  CreateLayer,
  hasPackagesFolder,
  getAuthorName
}