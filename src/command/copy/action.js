
const {log} = require("../../utils/tools");
const {createModel, updateModel} = require("../../template/model");
const {BaseError} = require("../../utils/error");
const service = require('./service')
const {fileTools} = require("../../utils/file");

module.exports = function (path, options){
  log.debug(path, options)
  const from = path[0];
  if(!from || !fileTools.isExist(from)){
    log.error('源文件不存在')
    return
  }
  const to = path.slice(1);
  const allIsDir = to.every(item => from!==to && fileTools.isDir(item))
  if(!allIsDir){
    log.error('目标路径中有非文件夹，或者被复制文件夹与目标文件夹相同')
    return
  }
  for (let i = 0; i < to.length; i++) {
    const toPath = to[i]
    if(fileTools.isFile(from)){
      service.copyFileOrDir(from, toPath, options.name,options.force)
    }else {
      service.copyDirToDir(from, toPath, options.name,options.force)
    }
  }
  // log.success('拷贝成功');
}
