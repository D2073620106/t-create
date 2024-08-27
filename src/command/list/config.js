const commander = require("commander")
const action = require("./action");
module.exports = {
  command:'list',
  alias:'l',
  description:'简介：查看已存储记录',
  addArgument: function(){
    return new commander.Argument('[path | name]', '名称 | 路径')
  },
  options:[
      {
        name:'type',
        alias:'t',
        description:'指定分类查看',
        default:'',
        type:'<char>'
      }
  ],
  action: action,
  // 介绍
  example:`
    eg:
      $ dmc list  // 查看全部
      $ dmc list test  // 查看test模板
      $ dmc list test -t vue  // 查看vue分类下的test模板
    `
}
