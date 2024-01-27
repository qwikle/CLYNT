# CLYNT

## Description

clynt is a command line tool allowing you to easily create a workspace
using clean architecture.
It uses Yarn as a package manager and Typescript as a language.
Lerna for monorepo management. And finally Nx for the workspace management.

## Installation

clynt need Yarn to be installed on your machine.

```bash
npm install -g yarn
```

Clone the repository and install the dependencies.

Then you can install clynt globally.

```bash
npm install -g
```

## Usage

```bash
clynt new <workspace-name>
```

The CLI will ask you some questions to configure your workspace.

you can use the default architecture layers (domain, application, infrastructure).

or you can create your own layers, and specify the name of each layer.

## License

[MIT](https://choosealicense.com/licenses/mit/)
