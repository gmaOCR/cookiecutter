#!/bin/bash

# Script de déploiement pour configurer et construire le projet avec Webpack, TypeScript et les packages @thatopen

# Étape 1: Initialisation du projet npm (si ce n'est pas déjà fait)
npm init -y

# Étape 2: Installation des dépendances nécessaires
npm install webpack webpack-cli webpack-dev-server ts-loader babel-loader @babel/core @babel/preset-env typescript @types/three stats.js @thatopen/ui @thatopen/components

# Étape 3: Configuration de TypeScript (tsconfig.json)
echo '{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true
  },
  "include": [
    "static/js/**/*.ts"
  ]
}' > tsconfig.json

# Étape 4: Configuration de Webpack (webpack.config.js)
echo 'const path = require("path");

module.exports = {
  entry: "./static/js/that_open.js",
  output: {
    filename: "that_open_bundle.js",
    path: path.resolve(__dirname, "static/dist"),
    publicPath: "/static/dist/",
    library: {
      type: "umd",
      name: "ThatOpen",
      export: "default",
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@thatopen/ui": path.resolve(__dirname, "node_modules/@thatopen/ui"),
      "@thatopen/components": path.resolve(__dirname, "node_modules/@thatopen/components"),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
  mode: "development",
};' > webpack.config.js

# Étape 5: Construction du projet avec Webpack
npm run build

# Étape 6: Déploiement (adapter cette section selon vos besoins spécifiques)

# Exemple: Copie des fichiers générés vers le serveur de déploiement
# scp static/dist/that_open_bundle.js user@server:/path/to/deployment

# Message de confirmation
echo "Déploiement terminé."

# Fin du script
