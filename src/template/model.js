const {fileTools} = require('../utils/file')
const {getCwdPath,log, isNotEmpty, isEmail} = require("../utils/tools");
const _path = require('path')
const config = require('../config')
const path = require("path");
const {localTemplateSavePath} = require("../config");
const _ = require("lodash");
const {BaseError} = require("../utils/error");

const { v4: uuidv4 } = require('uuid');
const {git} = require("../utils/git");
function createModel(basePath){
  const isGit = git.isGit(basePath)
  const linkType = isGit ? 'git' : fileTools.isDir(basePath) ? 'folder' : 'file'
  let path = ''
  if(isGit){
    path = basePath
  }else{
    if(linkType === 'folder'){
      if(fileTools.isAbsPath(basePath)){
        path = basePath
      }else{
        path = _path.join(getCwdPath(basePath),basePath)
      }
    }else{
      path = _path.join(getCwdPath(basePath),basePath)
    }
  }
  const name = isGit ? git.getProjectName(path) : fileTools.getFileName(path)
  const model = {
    uuid: uuidv4(), // 唯一标识
    createPath: path, // 经过处理后的创建地址
    createParams: basePath, // 创建时传入地址
    name, // 名称 | 文件为文件名 | 文件夹为文件夹名 | git为默认项目名，即地址携带的名称
    linkType , // folder | file | git
    fileType: linkType === 'file' ? fileTools.getFileType(basePath) : '',
    createTime: new Date().toLocaleString(),
    type: config.baseFolder, // 指定存储的文件夹
    savePath: '', // 保存到本地后的地址
    desc: '',  // 描述
    author: '', // 作者
    replaceIgnore:[], // 替换文本内容时需要忽略的文件，或文件夹
    giturl:'',
    gitname: '',
    gitemail:'',
    gitbranch:'master'
  }
  if(isGit){
    model.giturl = basePath
  }
  return model
}


function updateModel(_model, _options){
  const model = _.cloneDeep(_model)
  const options = _.cloneDeep(_options)
  // 移除空值
  let optionObj = _.pickBy(options, isNotEmpty)
  _.merge(model, optionObj)
  if(optionObj.gitemail && !isEmail(optionObj.gitemail)){
    throw new BaseError('邮箱格式错误')
  }
  //  拼接文件夹路径，得到模板保存路径
  if(model.linkType!=='git'){
    model.savePath = _path.join(localTemplateSavePath, model.type, model.name)
  }
  return model
}

/**
 * 移除model中不需要的属性
 * @param _model
 * @returns {PartialObject<object>}
 */
function removeModelProps(_model){
  const model = _.cloneDeep(_model)
  return _.pick(model, [
    'uuid',
    'createPath',
    'createParams',
    'name',
    'linkType',
    'fileType',
    'createTime',
    'type',
    'savePath',
    'desc',
    'author',
    'replaceIgnore',
    'giturl',
    'gitname',
    'gitemail',
    'gitbranch',
  ])
}


module.exports = {
  createModel,
  updateModel,
  removeModelProps
}
