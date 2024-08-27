const commander = require("commander")
const {getCwdPath} = require("../../utils/tools");
const action = require("./action");
module.exports = {
  command:'create',
  alias:'c',
  description:'简介：复制模板到指定目录',
  addArgument: function(){
    return new commander.Argument('<name>', '参数1 被复制的模板名称或uuid')
  },
  options:[
    {
      name:'replace',
      alias:'r',
      description:'替换模板中指定的字符串',
      default:'',
      type:'<char>'
    },
    {
      name:'name',
      alias:'n',
      description:'指定创建模板的名称',
      default:'',
      type:'<char>'
    },{
      name:'force',
      alias:'f',
      description:'是否强制覆盖原来的模板',
      default:false,
      type:''
    }
  ],
  action: action,
  // 介绍
  example:`
    eg:
      $ dmc create index.js // 创建index.jsmo模板到当前目录
      $ dmc create index.js -r @www@=nihao // 创建index.js模板到当前目录,并且替换其中@www@字符为nihao
    `
}
