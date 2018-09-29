// tslint:disable:no-console

// const replace = require('replace')

import * as webpack from 'webpack'
import * as path from 'path'

import CircularDependencyPlugin = require('circular-dependency-plugin')
// import AfterBuildPlugin = require('./zotero-webpack/plugin/after-build')

import 'zotero-plugin/make-dirs'
import 'zotero-plugin/copy-assets'
import 'zotero-plugin/rdf'
import 'zotero-plugin/version'

const config = {
  mode: 'production',
  optimization: {
    minimize: false,
    concatenateModules: false,
    noEmitOnErrors: true,
    // namedModules: true,
    // namedChunks: true,
    // runtimeChunk: false,
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  node: { fs: 'empty' },

  resolveLoader: {
    alias: {
      'json-loader': path.join(__dirname, './zotero-webpack/loader/json.ts'),
      'wrap-loader': 'zotero-plugin/loader/wrap',
    },
  },

  module: {
    rules: [
      { test: /\.json$/, use: [ 'json-loader' ] },
      { test: /\.ts$/, exclude: [ /node_modules/ ], use: [ 'wrap-loader', 'ts-loader' ] },
    ],
  },

  plugins: [
    new CircularDependencyPlugin({ failOnError: true }),
  ],

  context: path.resolve(__dirname, './content'),

  entry: {
    NameScanner: './NameScanner.ts',
  },

  output: {
    path: path.resolve(__dirname, './build/content'),
    filename: '[name].js',
    jsonpFunction: 'Zotero.WebPackedNameScanner',
    devtoolLineToLine: true,
    pathinfo: true,
    library: 'Zotero.[name]',
    libraryTarget: 'assign',
  },
}

export default config
