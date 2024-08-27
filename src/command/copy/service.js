const helper = require("../../template/helper");
const {fileTools} = require("../../utils/file");
const  _ = require("lodash");
const {removeModelProps} = require("../../template/model");
const {log,getCwdPath} = require("../../utils/tools");
const path = require("path");
const {BaseError} = require("../../utils/error");


/**
 * 复制文件到指定文件夹下，更具name修改文件名称，未传则使用原始文件名称
 * @param form
 * @param to
 * @param name
 */
function copyFileOrDir(form,to,name){
  if(!fileTools.isAbsPath(form)){
    form = path.join(getCwdPath(),form)
  }
  if(!name){
    name = fileTools.getFileName(form)
  }
  if(!fileTools.isAbsPath(to)){
    to = path.join(getCwdPath(),to,name)
  }
  if(fileTools.isExist(to)){
    throw new BaseError(`${to} 目标文件已存在`)
  }
  fileTools.copyFile(form,to);
}


/**
 * 复制文件夹到指定文件夹下，更具name修改文件夹名称，未传则使用from文件夹名称
 * @param form
 * @param to
 * @param name
 */
function copyDirToDir(form,to,name){
  if(!fileTools.isAbsPath(form)){
    form = path.join(getCwdPath(),form)
  }
  if(!fileTools.isAbsPath(to)){
    to = path.join(getCwdPath(),to, name || fileTools.getFileName(form))
  }
  if(fileTools.isExist(to)){
    throw new BaseError(`${to} 目标文件已存在`)
  }
  fileTools.copyDir(form,to);
}

module.exports = {
  copyFileOrDir,
  copyDirToDir
}
