const fs = require("fs");
const path = require("path");
const parser = require("@babel/parser");

function traverseDirectory(dir, callback) {
  if (dir.includes("node_modules")) return;
  if (dir.includes(".git")) return;
  if (dir.includes(".next")) return;
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverseDirectory(fullPath, callback);
    } else {
      callback(fullPath);
    }
  });
}

function extractDependencies(filePath, projectRoot) {
  const ext = path.extname(filePath);
  if (![".js", ".jsx", ".ts", ".tsx"].includes(ext)) return [];

  const code = fs.readFileSync(filePath, "utf-8");
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["typescript", "jsx"],
  });

  const dependencies = [];
  ast.program.body.forEach((node) => {
    if (node.type === "ImportDeclaration") {
      let dependency = node.source.value;

      if (dependency.startsWith("@/")) {
        dependency = path.join(projectRoot, dependency.substring(2));
      } else if (dependency.startsWith("./") || dependency.startsWith("../")) {
        dependency = path.resolve(path.dirname(filePath), dependency);
      } else {
        dependency = path.join(projectRoot, "node_modules", dependency);
      }

      let absolutePath = path.resolve(projectRoot, dependency);
      absolutePath = absolutePath.replace(/\.[^/.]+$/, "");
      const relativePath = path.relative(projectRoot, absolutePath);
      dependencies.push(relativePath);
    }
  });

  return dependencies;
}

function getDirectory(filePath) {
  const parts = filePath.split("/");
  if (parts.length === 1) {
    return "root";
  }
  return parts[0];
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function analyzeProjectDependencies(projectRoot) {
  const network = {};
  const nodes = [];
  const edges = [];
  const edgeImportCount = {};
  const directoryColors = {};

  traverseDirectory(projectRoot, (filePath) => {
    const relativePath = path.relative(projectRoot, filePath);
    network[relativePath] = extractDependencies(filePath, projectRoot);
  });

  Object.keys(network).forEach((filePath) => {
    edgeImportCount[filePath] = 0;
  });

  Object.keys(network).forEach((filePath, index) => {
    network[filePath].forEach((dependency) => {
      let foundDependency = false;
      const possibleExtensions = ["", ".js", ".jsx", ".ts", ".tsx"];
      for (let ext of possibleExtensions) {
        const dependencyWithExt = dependency + ext;
        const dependencyIndex = Object.keys(network).indexOf(dependencyWithExt);
        if (dependencyIndex !== -1) {
          edges.push({ from: index, to: dependencyIndex });
          edgeImportCount[dependencyWithExt]++;
          foundDependency = true;
          break;
        }
      }

      if (!foundDependency) {
        for (let ext of [".js", ".ts"]) {
          const dependencyWithIndex = dependency + "/index" + ext;
          const dependencyIndex =
            Object.keys(network).indexOf(dependencyWithIndex);
          if (dependencyIndex !== -1) {
            edges.push({ from: index, to: dependencyIndex });
            edgeImportCount[dependencyWithIndex]++;
            break;
          }
        }
      }
    });
  });

  Object.keys(network).forEach((filePath, index) => {
    const dir = getDirectory(filePath);
    if (!directoryColors[dir]) {
      directoryColors[dir] = getRandomColor();
    }
    nodes.push({
      id: index,
      label: filePath,
      value: edgeImportCount[filePath],
      color: directoryColors[dir],
      group: dir,
    });
  });

  console.log(`Total nodes: ${nodes.length}`);
  console.log(`Total edges: ${edges.length}`);

  return {
    nodes: nodes,
    edges: edges,
  };
}

module.exports = analyzeProjectDependencies;
