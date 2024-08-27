const helper = require("../../template/helper");
const Table = require("cli-table3");
const {log} = require("../../utils/tools");

/**
 * 根据name或uuid查询记录
 * @param nameOrUUid
 * @returns {FlatArray<(*|null)[][], 1>[]}
 */
function findByName(nameOrUUid){
  if(!nameOrUUid){
    return []
  }
  return helper.findByNameOrUUid(nameOrUUid)
}

/**
 * 根据type查询记录
 * @param type
 * @returns {unknown[]|*[]}
 */
function findByType(type){
  if(!type){
    return []
  }
  return helper.findByType(type)
}

/**
 * 根据name或uuid、type查询记录
 * @param nameOrUUid
 * @param type
 * @returns {unknown[]|[{}]}
 */
function findByNameAndType(nameOrUUid, type){
  if (!nameOrUUid || !type){
    return []
  }
  return helper.findByNameAndType(nameOrUUid, type)
}

/**
 * 查询所有记录
 * @returns {FlatArray<*[][], 1>[]}
 */
function findList(){
  return helper.findAllConfigToList()
}

/**
 * 创建表格，并填充数据
 * @param options
 * @param list
 * @returns {Table}
 */
function createTable(options, list){
  const table =new Table(options);
  table.push(...list)
  return table
}

/**
 * 显示列表
 * @param list
 */
function showList(list){
  if(list.length===0) return log.success('未查询到模板记录');
  list = list
      .sort((a,b)=>{return new Date(b.createTime).getTime()-new Date(a.createTime).getTime()})
      .map((item,index)=>{
        return [
          index+1, item.uuid, item.name, item.type, item.linkType, item.createTime, item.desc
        ]
      })
  // ['index','uuid', 'name', 'type', 'linkType','createTime','desc', 'path'],
  const table = createTable({
    head: ['index','uuid', 'name', 'type', 'linkType','createTime','desc'],
    colWidths: [8, 40, 15, 10, 10, 20, 40]
  }, list)
  log.success(table.toString())
}

/**
 * 显示详情
 * @param list
 */
function showDetail(list){
  if(list.length===0) return log.success('未查询到模板记录');
  let tabData = {}
  if(list.length===1){
    tabData = list[0]
  }else{
    log.success(`提示：查询到 ${list.length} 个模板，可以指定uuid或者使用-t查看单个模板信息`);
    showList(list)
    return
  }
  const data = Object.keys(tabData).map(key=>{
    return [key, tabData[key]]
  })
  const table = createTable({
    head: ['属性','值'],
    colWidths: [15, 80]
  }, data)
  log.success(table.toString())
}


module.exports = {
  findByName,
  findByType,
  findByNameAndType,
  findList,
  showList,
  showDetail
}
