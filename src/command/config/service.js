const path_ = require('path')
const helper = require("../../template/helper");
const Table = require("cli-table3");
const {log} = require("../../utils/tools");
const {chooseTemplate} = require("../../template/chooseTools");
const {writeConfig} = require("../../config/core");
const {TEMPLATE_BASE_PATH, TEMPLATE_BASE_FOLDER_PATH, readTemplateConfig, saveTemplateConfig} = require("../../template/helper");
const {fileTools} = require("../../utils/file");
const config = require("../../config");
const {BaseError} = require("../../utils/error");

/**
 *
 * @param data
 */
function updateConfig(data){
  writeConfig(data)
}


/**
 * 复制所有模板到新目录 目标目录,需要在更新配置前执行
 * @param newPath
 */
function copyAllTemplateToNew(newPath){
  // 1、修改模板配置config
  const temConfig = readTemplateConfig()
  Object.keys(temConfig).map(folderName=>{
    Object.keys(temConfig[folderName]).map(key=>{
        temConfig[folderName][key].savePath = path_.join(newPath, folderName, path_.basename(temConfig[folderName][key].savePath))
    })
  })
  saveTemplateConfig(temConfig)
  // 2、复制文件夹
  fileTools.copyDir(TEMPLATE_BASE_PATH, newPath)
  // 3、删除旧目录
  fileTools.delFileOrDir(TEMPLATE_BASE_PATH)
}


/**
 * 复制所有模板到新目录 目标目录,需要在更新配置前执行
 * @param newBaseFolder
 */
function updateBaseFolder(newBaseFolder){
  // 1、复制文件夹
  fileTools.copyDir(TEMPLATE_BASE_FOLDER_PATH, path_.join(TEMPLATE_BASE_PATH, newBaseFolder))
  // 2、修改模板配置config
  const temConfig = readTemplateConfig()
  if(temConfig[newBaseFolder]){
    log.error(`分类${newBaseFolder}已存在，不能设置重复路径`)
    return 0
  }
  const base = temConfig[config.baseFolder]
  const newBase = {}
  Object.keys(base).map(key=>{
    const data = base[key]
    data.savePath = path_.join(TEMPLATE_BASE_PATH, newBaseFolder, path_.basename(data.savePath))
    data.type = newBaseFolder
    newBase[key] = data
  })
  temConfig[newBaseFolder] = newBase
  delete temConfig[config.baseFolder]
  saveTemplateConfig(temConfig)
  // 3、删除旧目录
  fileTools.delFileOrDir(TEMPLATE_BASE_FOLDER_PATH)
}

module.exports = {
  updateConfig,
  copyAllTemplateToNew,
  updateBaseFolder
}
