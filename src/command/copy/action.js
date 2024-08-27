
const {log} = require("../../utils/tools");
const {createModel, updateModel} = require("../../template/model");
const {BaseError} = require("../../utils/error");
const service = require('./service')
const {fileTools} = require("../../utils/file");

module.exports = function (path, options){
log.debug(path, options)
  const from = path[0];
  if(!from || !fileTools.isExist(from)){
    throw new BaseError('源文件不存在')
  }
  const to = path.slice(1);
  to.forEach(toPath => {
    // const idFile = toPath.indexOf('.')===-1
    if(!fileTools.isDir(toPath)){
      throw new BaseError('目标文件夹非文件夹')
    }
    if(fileTools.isFile(from)){
      service.copyFileOrDir(from, toPath, options.name)
    }else {
      service.copyDirToDir(from, toPath, options.name)
    }
  })

  log.success('拷贝成功');
}
