const commander = require("commander")
const {getCwdPath} = require("../../utils/tools");
const action = require("./action");
module.exports = {
  command:'save',
  alias:'s',
  description:'简介：存储文件到本地，设置了邮箱在代码拉去完成后会自动设置成原来的',
  addArgument: function(){
    return new commander.Argument('[path]', '文件路径 | 文件夹路径 | git地址')
        .default(`${getCwdPath()}`, '默认当前执行目录')
  },
  options:[
    {
      name:'name',
      alias:'n',
      description:'存储名称',
      default:'',
      type:'<char>'
    },{
      name:'type',
      alias:'t',
      description:'指定分类文件夹，如vue, react, javascript等，未创建的分类文件夹将自动创建',
      default:'',
      type:'<char>'
    },{
      name:'force',
      alias:'f',
      description:'是否强制覆盖原来的模板',
      default:false,
      type:''
    },{
      name:'gitname',
      alias:'gn',
      description:'git的用户名称',
      default:'',
      type:'<char>'
    },{
      name:'gitemail',
      alias:'ge',
      description:'git的用户邮箱',
      default:'',
      type:'<char>'
    },{
      name:'desc',
      alias:'d',
      description:'文件的介绍信息',
      default:'',
      type:'<char>'
    }
  ],
  action: action,
  // 运行顺序
  // funSort: ['command','alias','description','addArgument','options','action'],
  // 介绍
  example:`
    eg:
      $ dmc save 
      $ dmc save test
      $ dmc save test.js
      $ dmc save test.js -n test
      $ dmc save test.js -n test -t vue
      $ dmc save test.js -n test -t vue -f
      $ dmc save test.js -n test -t vue -f --gitname zhangsan
      $ dmc save test.js -n test -t vue -f --gitname zhangsan --gitemail email@123.com
      $ dmc save test.js -n test -t vue -f --gitname zhangsan --gitemail email@123.com -d 介绍或备注
    `
}
