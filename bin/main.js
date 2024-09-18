#!/usr/bin/env node

const { Command } = require('commander');
const program = new Command();
const packageInfo = require('../package')
const {initConfig} = require("../src/config/core");
const {initLocalTemplate} = require("../src/template/init");
const { registerProgram } = require('../src/command/index');

// 初始化配置
initConfig()

// 初始化本地公共模板
initLocalTemplate()

program
.name(packageInfo.name)
.description(packageInfo.description)
.version(packageInfo.version)

registerProgram(program)

program.parse();
