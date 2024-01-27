import { writeFile, readFile, mkdir, access } from 'fs/promises';
import { join } from 'path';

const templatePath = join(import.meta.dirname, 'template');

async function createRootWorkspaceJson({name, author, layers}){
  const layersWorksSpace = await layersWorksPace(layers);
   await createFolder('packages');
    let packageJson = await readFile(`${templatePath}/root/package.json.txt`, 'utf8');
  packageJson = packageJson.replace(/{{name}}/g, name);
  packageJson = packageJson.replace(/{{author}}/g, author);
  await writeFile('./package.json', packageJson);

  let tsconfigJson = await readFile(`${templatePath}/root/tsconfig.json.txt`, 'utf8');
  await writeFile('./tsconfig.json', tsconfigJson);

  let gitignore = await readFile(`${templatePath}/root/.gitignore.txt`, 'utf8');
  await writeFile('./.gitignore', gitignore);

  let nxJson = await readFile(`${templatePath}/root/nx.json.txt`, 'utf8');
  await writeFile('./nx.json', nxJson);

  let lernaJson = await readFile(`${templatePath}/root/lerna.json.txt`, 'utf8');
  await writeFile('./lerna.json', lernaJson);

  let workspace = await readFile(`${templatePath}/root/default.code-workspace.txt`, 'utf8');
  workspace = workspace.replace(/{{name}}/g, name);
  workspace = workspace.replace(/{{layers}}/g, layersWorksSpace);
  await writeFile('./default.code-workspace', workspace);
}

 async function CreateLayer({name, author}){
  await createFolder(`packages/${name}`);
  await createFolder(`packages/${name}/src`);
  let packageJson = await readFile(`${templatePath}/layer/package.json.txt`, 'utf8');
  packageJson = packageJson.replace(/{{name}}/g, name);
  packageJson = packageJson.replace(/{{author}}/g, author);
  await writeFile(`./packages/${name}/package.json`, packageJson);
  

  let tsconfigJson = await readFile(`${templatePath}/layer/tsconfig.json.txt`, 'utf8');
  await writeFile(`./packages/${name}/tsconfig.json`, tsconfigJson);
  
  let tsconfigBuildJson = await readFile(`${templatePath}/layer/tsconfig.build.json.txt`, 'utf8');
  await writeFile(`./packages/${name}/tsconfig.build.json`, tsconfigBuildJson);

  let gitignore = await readFile(`${templatePath}/layer/.gitignore.txt`, 'utf8');
  await writeFile(`./packages/${name}/.gitignore`, gitignore);

  let rollupConfig = await readFile(`${templatePath}/layer/rollup.config.js.txt`, 'utf8');
  await writeFile(`./packages/${name}/rollup.config.js`, rollupConfig);

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

export {
  createRootWorkspaceJson,
  buildLayers,
  createFolder
}