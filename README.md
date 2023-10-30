# VizionJS

Visualize your project's dependency network in a blink of an eye with VizionJS!

![Albuquerque, New Mexico](/assets/demo.png)
_Next: next.js/packages/next/src visualization_

## Table of Contents

- [VizionJS](#vizionjs)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Contribute](#contribute)
  - [License](#license)

## Description

VizionJS is a Node.js tool that helps developers visualize the dependencies in their JavaScript and TypeScript projects. By generating a dependency network, developers can gain insights into the structure and connections within their codebase.

## Installation

To install VizionJS globally, use the following command:

```bash
npm install -g vizionjs
```

Or, you can run it directly using:

```bash
npx vizionjs@latest
```

## Usage

Navigate to your project's root directory and run:

```bash
npx vizionjs .
```

The command will analyze your project's dependencies and launch a local server. Open your browser and visit http://localhost:3000 to see the visual representation of your project's dependency network.

## Features

- Quick Analysis: Rapidly parses and analyzes your project files.
- Interactive Visualization: Dive deep into the visual representation of your codebase's dependencies.
- Support for Multiple File Types: VizionJS supports .js, .jsx, .ts, and .tsx file extensions.
- Exclusion of Unwanted Directories: Skips over node_modules, .git, and .next directories.

## Contribute

We welcome contributors! If you find an issue or have a feature request, please open an issue. For major changes, it's always a good practice to open an issue first to discuss the potential changes.

1. Fork the project.
2. Create a new branch (git checkout -b feature/YourFeature).
3. Make your changes.
4. Commit your changes (git commit -am 'Add some feature').
5. Push to the branch (git push origin feature/YourFeature).
6. Open a pull request.

## License

MIT License.
