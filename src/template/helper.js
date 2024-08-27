const _ = require('lodash');
const {fileTools} = require("../utils/file");
const {BaseError} = require('../utils/error');
const config = require("../config/index");
const path = require("path");

const TEMPLATE_JSON_PATH = path.join(config.localTemplateSavePath, 'template.json')
const TEMPLATE_BASE_FOLDER_PATH = path.join(config.localTemplateSavePath, config.baseFolder)
const TEMPLATE_BASE_PATH = path.join(config.localTemplateSavePath, '')



/**
 * 读取模板配置文件
 * @returns {any}
 */
function readTemplateConfig() {
  if(fileTools.isExist(TEMPLATE_JSON_PATH)){
    return JSON.parse(fileTools.getFileContent(TEMPLATE_JSON_PATH));
  }
  throw new BaseError(`template.json模板不存在`);
}



/**
 * 保存模板配置信息到json文件
 * @param configJson
 */
function saveTemplateConfig(configJson){
  fileTools.createFile(TEMPLATE_JSON_PATH, JSON.stringify(configJson, null, 2))
}


/**
 * 保存模板文件或文件夹
 * @param model
 */
function saveTemplateFileOrDir(model){
  if(model.linkType === 'file'){
    fileTools.copyFile(model.createPath, model.savePath)
  }
  if(model.linkType === 'folder'){
    fileTools.copyDir(model.createPath, model.savePath, config.ignore)
  }
}

/**
 * 添加模板配置信息
 * @param model_
 */
function addConfig(model_){
  let model = _.cloneDeep(model_)
  const templateJson = readTemplateConfig()
  if(_.isObject(templateJson[model.type])){
    templateJson[model.type][model.name] = model
  }else{
    templateJson[model.type] = {[model.name]:model}
  }
  saveTemplateConfig(templateJson)
}


/**
 * 删除模板文件或文件夹
 * @param model_
 */
function deleteTemplateFileOrDir(model_){
  const pathJoin = model_.savePath
  fileTools.delFileOrDir(pathJoin)
}

/**
 * 删除某个分类下的所有模板
 * @param type
 */
function deleteTemplateFileOrDirByType(type){
  fileTools.delFileOrDir(path.join(TEMPLATE_BASE_PATH, type))
}

/**
 * 删除单个模板配置信息
 * @param model_
 */
function removeConfigByName(model_){
  const templateJson = readTemplateConfig()
  delete templateJson[model_.type][model_.name];
  saveTemplateConfig(templateJson)
}

/**
 * 删除某个分类下的所有模板配置信息
 * @param type
 */
function removeConfigByType(type){
  const templateJson = readTemplateConfig()
  delete templateJson[type];
  saveTemplateConfig(templateJson)
}



/**
 * 删除所有模板配置信息
 */
function deleteAllTemplates(){
  // 直接删除文件夹
  fileTools.delFileOrDir(TEMPLATE_BASE_PATH)
}


/**
 * 根据name或uuid查询模板记录
 * @param nameOrUUid
 * @returns {FlatArray<(*|boolean)[][], 1>[]}
 */
function findByNameOrUUid(nameOrUUid){
  const templateJson = readTemplateConfig()
  return Object.keys(templateJson).map(type_=>{
    return Object.keys(templateJson[type_]).map(name=>{
      if(templateJson[type_][name].uuid===nameOrUUid || nameOrUUid===name){
        return templateJson[type_][name]
      }
      return false
    })
  }).flat().filter(Boolean)
}

/**
 * 根据type查询模板记录
 * @param type
 * @returns {unknown[]|*[]}
 */
function findByType(type){
  const templateJson = readTemplateConfig()
  if(templateJson[type]){
    return Object.values(templateJson[type])
  }
  return []
}

/**
 * 查询type分类下符合name或uuid模板记录
 * @param nameOrUUid
 * @param type
 * @returns {unknown[]|[]}
 */
function findByNameAndType(nameOrUUid, type){
  const configJson = readTemplateConfig()
  if(configJson[type]){
    return Object.values(configJson[type]).filter(v=>v.uuid===nameOrUUid || nameOrUUid===v.name)
  }
  return []
}


/**
 * 查询所有记录
 * @returns {FlatArray<*[][], 1>[]}
 */
function findAllConfigToList(){
  const configJson = readTemplateConfig()
  return Object.keys(configJson).map(type_=>{
    return Object.keys(configJson[type_]).map(name=>{
      return configJson[type_][name]
    })
  }).flat()
}


module.exports = {
  readTemplateConfig,
  saveTemplateConfig,
  saveTemplateFileOrDir,
  addConfig,
  deleteTemplateFileOrDir,
  deleteTemplateFileOrDirByType,
  deleteAllTemplates,
  removeConfigByName,
  removeConfigByType,
  findByNameOrUUid,
  findByType,
  findByNameAndType,
  findAllConfigToList,
  TEMPLATE_JSON_PATH,
  TEMPLATE_BASE_FOLDER_PATH,
  TEMPLATE_BASE_PATH
}
