#!/usr/bin/env node
// const commander = require('commander');
// const program = new commander.Command();
// const program = new Command();
// const { getTemplateFromGit } = require('../src/clone-init.js');
// program
// .name(require('../package','-v, --version').name)
// .description('download project from gitee11')
// .version(require('../package','-v, --version').version)

// // .parse(process.argv);


// program.command('create')
// .description('download project from gitee')
// .argument('<string>', 'string to split')
// .action((pName, options)=>{
//   console.log('创建', pName,options);
//   console.log('创建', pName,);
//   // getTemplateFromGit(pName)
// })
// program.parse(process.argv)

// program.command('split')
//   .description('Split a string into substrings and display as an array')
//   .argument('<string>', 'string to split')
  // .option('--first', 'display just the first substring')
//   .option('-s, --separator <char>', 'separator character', ',')
//   .action((str, options) => {
    // const limit = options.first ? 1 : undefined;
    // console.log(str.split(options.separator, limit));
//     console.log(str,options.separator);
//   });

// program.parse();



// const service = new commander.Command('service');

// service
//   .command('start [port]')
//   .description('start service at some port')
//   .action((port) => {
//     console.log(`Starting service on port ${port || 3000}`);
//   });

// service
//   .command('stop')
//   .description('stop service')
//   .action(() => {
//     console.log('Stopping service...');
//   });

// program.addCommand(service);



// const { Command } = require('commander');
// const program = new Command();

// program
//   .argument('<name>')
//   .option('-t, --title <honorific>', 'title to use before name')
//   .option('-d, --debug', 'display some debugging')
//   .action((name, options, command) => {
//     if (options.debug) {
//       console.error('Called %s with options %o', command.name(), options);
//     }
//     const title = options.title ? `${options.title} ` : '';
//     console.log(`Thank-you ${title}${name}`);
//   });


// program
//   .argument('<text>')
//   .option('-a, --ath <honorific>', 'title to use before name')
//   .option('-d, --debug', 'display some debugging')
//   .action((name, options, command) => {
//     if (options.debug) {
//       console.error('Called %s with options %o', command.name(), options);
//     }
//     const ath = options.ath ? `${options.ath} ` : '';
//     console.log(`Thank-you ${ath}${name}`);
//   });

// program.parse();

const { Command } = require('commander');
const program = new Command();
const { registerProgram } = require('../src/command/index');
const packageInfo = require('../package')
const {initConfig} = require("../src/config/core");
const {initLocalTemplate} = require("../src/template/init");

initConfig()

// 初始化本地公共模板
initLocalTemplate()

program
.name(packageInfo.name)
.description(packageInfo.description)
.version(packageInfo.version)

registerProgram(program)

program.parse();
