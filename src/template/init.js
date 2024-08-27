const config = require('../config/index')
const path = require('path')
const {log} = require('../utils/tools')
const {fileTools} = require('../utils/file')
const {TEMPLATE_BASE_FOLDER_PATH, TEMPLATE_JSON_PATH} = require('./helper')


// 创建公共的模板存储路劲
function createCommonDir() {
  if (!fileTools.isExist(TEMPLATE_BASE_FOLDER_PATH)){
    fileTools.createDir(TEMPLATE_BASE_FOLDER_PATH)
    log.debug(`${config.baseFolder} 基础模板创建成功, 未指定模板存储文件夹时，默认使用common，即（-f ${config.baseFolder}）`)
  }
}

// 创建模板映射json文件，提供读取使用
function createTemplateJson() {
  if(!fileTools.isExist(TEMPLATE_JSON_PATH)){
    const templateJson =`{"${config.baseFolder}":{}}`
    log.debug(`创建了json 文件${TEMPLATE_JSON_PATH}`)
    fileTools.createFile(TEMPLATE_JSON_PATH, templateJson)
  }
}

// 初始化本地模板，创建公共模板存储文件夹，创建模板映射json文件
function initLocalTemplate() {
  createCommonDir()
  createTemplateJson()
}


module.exports = {initLocalTemplate, TEMPLATE_JSON_PATH, TEMPLATE_BASE_FOLDER_PATH}
