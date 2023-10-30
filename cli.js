#!/usr/bin/env node

const path = require("path");
const generateServer = require("./generate.js");

const projectPath = process.argv[2];

if (!projectPath) {
  console.error("Veuillez fournir un chemin de projet.");
  process.exit(1);
}

generateServer(path.resolve(process.cwd(), projectPath));
