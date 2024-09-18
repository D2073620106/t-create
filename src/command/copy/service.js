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
 * @param force  是否覆盖
 */
function copyFileOrDir(form,to,name,force){
  if(!fileTools.isAbsPath(form)){
    form = path.join(getCwdPath(),form)
  }
  if(!name){
    name = fileTools.getFileName(form)
  }
  if(!fileTools.isAbsPath(to)){
    to = path.join(getCwdPath(),to,name)
  }
  if(!force && fileTools.isExist(to)){
    log.error(`${to} 目标文件已存在`)
    return
  }
  fileTools.copyFile(form,to);
}


/**
 * 复制文件夹到指定文件夹下，更具name修改文件夹名称，未传则使用from文件夹名称
 * @param form
 * @param to
 * @param name
 * @param force  是否覆盖
 */
function copyDirToDir(form,to,name,force){
  if(!fileTools.isAbsPath(form)){
    form = path.join(getCwdPath(),form)
  }
  if(!fileTools.isAbsPath(to)){
    to = path.join(getCwdPath(),to, name || fileTools.getFileName(form))
  }
  if(!force && fileTools.isExist(to)){
    log.error(`${to} 目标文件已存在`)
    return
  }
  fileTools.copyDir(form,to);
}

module.exports = {
  copyFileOrDir,
  copyDirToDir
}
