'use strict';

const fs = require('fs');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const config = require('./config/webpack.config');


function createCompiler(config) {
    let compiler;
    try {
        compiler = webpack(config);
    } catch (err) {
        console.log(chalk.red('Failed to compile.'));
        console.log();
        console.log(err.message || err);
        console.log();
        process.exit(1);
    }

    // webpack process is async,  so here we add a handler when it finished
    compiler.plugin('done', stats => {
        console.log('Compiled done!', stats);
    });

    return compiler;
}

let compiler = createCompiler(config);
const devServer = new WebpackDevServer(compiler, serverConfig);