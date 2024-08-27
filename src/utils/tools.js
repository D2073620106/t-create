
const {env} = require( "../config")
const chalk = require('chalk');
const _path = require('path');
const fs = require('fs');
const {exec,execSync,execFileSync,} = require('child_process');
const _ =  require('lodash')

function logFun(text){
  function debug(...args){
    if(env.debug){
      console.log(chalk.yellow.bold('debug ===>'),...args);
    }
  }

   function success(...args){
    console.log(chalk.green.bold(...args));
  }


  function warn(...args){
    console.log(chalk.yellow.bold('warn:'),...args);
  }


  function error(...args){
    console.log(chalk.red.bold('error:'),...args);
  }

  function info(...args){
    console.log(chalk.gray.bold('info:'),...args);
  }
  return {
    debug,
    success,
    warn,
    error,
    info
  }
}


const log = logFun()




//工作目录的绝对路径
function getCwdPath(){
  return process.cwd();
}



function isEmail(email){
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return reg.test(email)
}



/**
 * 判断值是否不为空
 * @param value
 * @returns {boolean}
 */
const isNotEmpty = value =>
    value !== null &&
    value !== undefined &&
    !(typeof value === 'string' && value === '') &&
    !(Array.isArray(value) && value.length === 0) &&
    !(typeof value === 'object' && Object.keys(value).length === 0 && value.constructor === Object);


/**
 * 判断值是否为空
 * @param value
 * @returns {boolean}
 */
const isEmpty = value =>
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value === '') ||
    (Array.isArray(value) && value.length === 0) ||
    (typeof value === 'object' && Object.keys(value).length === 0 && value.constructor === Object);



module.exports={
  log,
  getCwdPath,
  isEmail,
  isNotEmpty,
  isEmpty,
}
