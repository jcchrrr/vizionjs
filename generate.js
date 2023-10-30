const express = require("express");
const path = require("path");
const analyzeProjectDependencies = require("./analyze.js");

module.exports = function (projectRoot = process.cwd()) {
  console.log("Génération du réseau de dépendances...");
  const network = analyzeProjectDependencies(projectRoot);

  const app = express();
  const port = 3000;

  app.get("/data", (req, res) => {
    res.json(network);
  });

  const publicPath = path.join(__dirname, "public");
  app.use(express.static(publicPath));

  app.listen(port, () => {
    console.log(`Serveur lancé à http://localhost:${port}`);
  });
};
