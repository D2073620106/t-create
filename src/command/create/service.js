const helper = require("../../template/helper");
const {fileTools} = require("../../utils/file");
const  _ = require("lodash");
const {removeModelProps} = require("../../template/model");
const {log,getCwdPath} = require("../../utils/tools");
const path = require("path");
const {BaseError} = require("../../utils/error");
const {chooseTemplate} = require("../../template/chooseTools");
const _path = require('path')
const {git} = require("../../utils/git");
const fs = require("fs");

/**
 * 获取模板模型
 * @param nameOrUUid
 * @returns {Promise<*|boolean>}
 */
async function getTemplateModel(nameOrUUid) {
  const templates = helper.findByNameOrUUid(nameOrUUid)
  let model = templates[0]
  if (templates.length > 1) {
    model = await chooseTemplate(templates, '找到多个模板，请选择要复制的模板')
  }
  return model
}

/**
 * 复制模板
 * @param model
 * @param targetPath
 * @returns {Promise<void>}
 */
async function createTemplate(model,targetPath) {
  const path = model.savePath
  if(model.linkType==='folder'){
    fileTools.copyDir(path, targetPath)
  }else if(model.linkType==='file'){
    fileTools.copyFile(path, targetPath)
  }else{
    try{
      await git.clone(model.giturl, targetPath)
      // await git.checkoutRemoteBranch(model.branch)
    }catch (e) {
      log.debug(e)
    }
  }
}

/**
 * 字符串转对象
 * @param str
 * @returns {*}
 */
function replaceStrToObj(str){
  if(!str || !_.isString(str)) return {}
  return str.split(',').reduce((result,item)=>{
    const key = item.split('=')[0].trim()
    const value = item.split('=')[1].trim()
    if(key && value){
      result[key] = value
    }
    return result
  },{});
}


/**
 * 替换模板字符串
 * @param targetName
 * @param replaceStr
 * @param model
 */
function textReplace(targetName, replaceStr, model){
  function replaceFile(filePath, replaceObj){
    if(fileTools.isFile(filePath)){
      let content = fileTools.getFileContent(filePath)
      Object.keys(replaceObj).map((key)=>{
        content = content.replace(new RegExp(key, 'g'), replaceObj[key])
      })
      fileTools.createFile(filePath, content)
    }
  }
  const replaceObj = replaceStrToObj(replaceStr)
  if(fileTools.isDir(targetName)){
    function replaceFun(targetName_){
      const entries = fs.readdirSync(targetName_, { withFileTypes: true });
      for (let entry of entries) {
        // 忽略文件
        if(_.isArray(model.replaceIgnore) && model.replaceIgnore.includes(entry.name)){
          continue
        }
        const srcPath = path.join(targetName_, entry.name);
        log.debug('srcPath',srcPath)
        if (entry.isFile()) {
          replaceFile(srcPath, replaceObj)
        }else{
          replaceFun(srcPath)
        }
      }
    }
    replaceFun(targetName)

  }else{
    replaceFile(targetName, replaceObj)
  }
}






module.exports = {
  createTemplate,
  textReplace,
  getTemplateModel
}
