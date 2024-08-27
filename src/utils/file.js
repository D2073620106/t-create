const _ = require("lodash");
const fs = require("fs");
const _path = require("path");
const {BaseError} = require("./error");
const {log} = require("./tools");

function pathPass(path){
  if(!path || !_.isString(path)){
    throw new BaseError('path is not string')
  }
}

const tools =  {
  isFile(path){
    return fs.existsSync(path) && fs.statSync(path).isFile()
  },
  isDir(path){

    return fs.existsSync(path) && fs.statSync(path).isDirectory()
  },
  // 文件或目录是否存在
  isExist(path){
    return fs.existsSync(path)
  },
  isEmptyDir(path){
    if(this.isDir(path)){
      return fs.readdirSync(path).length === 0
    }
    return false
  },
  isEmptyFile(path){
    if(this.isFile(path)){
      return fs.readFileSync(path).length === 0
    }
    return false
  },
  isEmpty(path){
    if(this.isFile(path)){
      return this.isEmptyFile(path)
    }
    if(this.isDir(path)){
      return this.isEmptyDir(path)
    }
    return false
  },
  isEmptyDirOrFile(path){
    return this.isEmptyDir(path) || this.isEmptyFile(path)
  },
  getFileName(path){

    return _path.basename(path)
  },
  getFileType(path){

    return path.split('.').pop()
  },
  getFileSize(path){
    return fs.statSync(path).size
  },
  getFileContent(path){
    return fs.readFileSync(path, 'utf8')
  },
  // 创建文件
  createFile(path, content){
    if(!content || !_.isString(content)){
      throw new BaseError('content is not string')
    }
    fs.writeFileSync(path, content, 'utf8')
  },
  createDir(path){
    if(!this.isDir(path)){
      fs.mkdirSync(path,{recursive: true})
    }
  },
  delFileOrDir(path){
    if(this.isFile(path)){
      fs.unlinkSync(path)
    }else if(this.isDir(path)){
      fs.rmdirSync(path, {recursive: true})
    }
  },
  // 检查文件路径是否为完整路径，兼容linux,win,mac，以常见路径格式判断
  isAbsPath(path){
    // 去除路径末尾可能存在的分隔符
    const cleanedPath = path.trim().replace(/[\/\\]$/, '');
    // Windows绝对路径通常以驱动器字母和冒号（C:\）或网络位置（\\）开头
    if (cleanedPath.match(/^[A-Z]:\\/) || cleanedPath.match(/^\\\\/)) {
      return true;
    }
    // Linux和macOS绝对路径以斜杠（/）开头
    if (cleanedPath.startsWith('/')) {
      return true;
    }
    // 如果路径不符合上述任何模式，则假定它不是绝对路径
    return false;
  },
  // 拷贝文件
  copyFile(fromPath, toPath){
    log.info('copyFile', fromPath, toPath)
    if(!this.isFile(fromPath)){
      throw new BaseError('fromPath is not file')
    }
    fs.copyFileSync(fromPath, toPath)
  },
  // 拷贝文件夹
  copyDir(fromPath, toPath, ignore){
    log.info('copyDir', fromPath, toPath)
    if(!this.isDir(fromPath)){
      throw new BaseError('fromPath is not dir')
    }
    const copy = (src,toPath)=>{
      if(this.isDir(src)){
        fs.mkdirSync(toPath, { recursive: true });
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (let entry of entries) {
          // 忽略文件
          if(_.isArray(ignore) && ignore.includes(entry.name)){
            continue
          }
          const srcPath = _path.join(src, entry.name);
          const destPath = _path.join(toPath, entry.name);
          if (entry.isFile()) {
            // 如果是文件，则复制文件
            fs.copyFileSync(srcPath, destPath);
          }else if (entry.isDirectory()) {
            // 如果是目录，则递归复制目录
            copy(srcPath, destPath);
          }
        }
      }
    }
    copy(fromPath, toPath)
  }
}

/**
 * 添加前置函数
 * @param target
 * @param beforeFunc
 * @param ignore
 * @returns {(function(...[*]): (unknown))|*}
 */
function addBeforeCall(target, beforeFunc, ignore) {
  return new Proxy(target, {
    get(target, prop, receiver) {
      return function(...args) {
        // 处理被忽略的属性
        if(_.isArray(ignore) && ignore.includes(prop)){
          if(_.isFunction(target[prop])) {
            return Reflect.apply(target[prop], receiver, args);
          }
          return Reflect.get(...arguments);
        }
        if(_.isFunction(target[prop])){
          beforeFunc(...args);
          return Reflect.apply(target[prop], receiver, args);
        }
        return Reflect.get(target[prop], receiver, args );
      };
    }
  });
}


// 给fileTools里面的方法添加前置参数校验方法
const fileTools = addBeforeCall(tools, pathPass,['copyDir','copyFile'])


module.exports ={fileTools}
