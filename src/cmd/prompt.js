import prompt from 'prompts';
// array of all licences accepted by npm
const licences = [
  {title: 'Apache-2.0', value: 'Apache-2.0'},
  {title: 'BSD-2-Clause', value: 'BSD-2-Clause'},
  {title: 'BSD-3-Clause', value: 'BSD-3-Clause'},
  {title: 'BSD-3-Clause-Clear', value: 'BSD-3-Clause-Clear'},
  {title: 'CC-BY-4.0', value: 'CC-BY-4.0'},
  {title: 'CC-BY-SA-4.0', value: 'CC-BY-SA-4.0'},
  {title: 'CC0-1.0', value: 'CC0-1.0'},
  {title: 'EPL-1.0', value: 'EPL-1.0'},
  {title: 'GPL-2.0', value: 'GPL-2.0'},
  {title: 'GPL-3.0', value: 'GPL-3.0'},
  {title: 'ISC', value: 'ISC'},
  {title: 'MIT', value: 'MIT'},
  {title: 'MPL-2.0', value: 'MPL-2.0'},
  {title: 'Unlicense', value: 'Unlicense'},
  {title: 'WTFPL', value: 'WTFPL'},
  {title: 'Zlib', value: 'Zlib'},
]

async function licencesPrompt(){
  const response = await prompt([{
    type: 'select',
    name: 'liscense',
    message: 'Select a licence',
    choices: licences,
  }], {
    onCancel: () => {
      process.exit();
    },
  });
  return response;
}

async function useDefaultLayer(){
  const {value} = await prompt([{
    type: 'confirm',
    name: 'value',
    message: 'Use default layer structure? (domain, application, infrastructure)',
    initial: true,
  }], {
    onCancel: () => {
      process.exit();
    },
  });
  return value;
}

async function ListOfSpecifiLayers(){
  const { value } = await prompt([{
    type: 'list',
    name: 'value',
    message: 'Enter the name of each layer you want to add separated by a comma',
    initial: '',
    separator: ',',
  }])
  return value;
}

export  {
  licencesPrompt,
  useDefaultLayer,
  ListOfSpecifiLayers
}